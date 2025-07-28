import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FileAnalysis {
  columns: string[];
  rowCount: number;
  dataTypes: Record<string, string>;
  sampleData: any[];
  fileSize: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const datasetInfo = JSON.parse(formData.get('datasetInfo') as string);
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return new Response(
        JSON.stringify({ error: 'File and userId are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze file structure
    const fileAnalysis = await analyzeFile(file);
    
    // Upload file to Supabase storage
    const fileName = `${userId}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('datasets')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(
        JSON.stringify({ error: 'Failed to upload file' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('datasets')
      .getPublicUrl(fileName);

    // Insert dataset record into database
    const { data: dataset, error: dbError } = await supabase
      .from('datasets')
      .insert({
        user_id: userId,
        name: datasetInfo.name,
        description: datasetInfo.description,
        file_type: file.type || getFileExtension(file.name),
        file_size: file.size,
        file_url: urlData.publicUrl,
        file_structure: fileAnalysis,
        access_type: datasetInfo.accessType || 'open',
        access_price: datasetInfo.accessPrice || 0,
        region: datasetInfo.region,
        tags: datasetInfo.tags || []
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save dataset information' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log user activity
    await supabase
      .from('user_activities')
      .insert({
        user_id: userId,
        activity_type: 'dataset_upload',
        activity_data: {
          dataset_id: dataset.id,
          dataset_name: datasetInfo.name,
          file_size: file.size
        }
      });

    // Create notification
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'dataset',
        title: 'Dataset Upload Successful',
        message: `Your dataset "${datasetInfo.name}" has been uploaded and is pending verification.`,
        data: {
          dataset_id: dataset.id,
          status: 'pending'
        }
      });

    // Start verification process (simulate 30 seconds delay)
    EdgeRuntime.waitUntil(verifyDataset(supabase, dataset.id, userId));

    return new Response(
      JSON.stringify({ 
        success: true, 
        dataset: dataset,
        fileAnalysis: fileAnalysis 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function analyzeFile(file: File): Promise<FileAnalysis> {
  const text = await file.text();
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.csv')) {
    return analyzeCsv(text, file.size);
  } else if (fileName.endsWith('.json')) {
    return analyzeJson(text, file.size);
  } else {
    return {
      columns: ['Unknown'],
      rowCount: 0,
      dataTypes: {},
      sampleData: [],
      fileSize: file.size
    };
  }
}

function analyzeCsv(csvText: string, fileSize: number): FileAnalysis {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) {
    return { columns: [], rowCount: 0, dataTypes: {}, sampleData: [], fileSize };
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const dataLines = lines.slice(1);
  
  const sampleData = dataLines.slice(0, 5).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });

  const dataTypes: Record<string, string> = {};
  headers.forEach((header, index) => {
    const sampleValue = sampleData[0]?.[header];
    if (sampleValue && !isNaN(Number(sampleValue))) {
      dataTypes[header] = 'number';
    } else if (sampleValue && (sampleValue.includes('-') || sampleValue.includes('/'))) {
      dataTypes[header] = 'date';
    } else {
      dataTypes[header] = 'string';
    }
  });

  return {
    columns: headers,
    rowCount: dataLines.length,
    dataTypes,
    sampleData,
    fileSize
  };
}

function analyzeJson(jsonText: string, fileSize: number): FileAnalysis {
  try {
    const data = JSON.parse(jsonText);
    let columns: string[] = [];
    let rowCount = 0;
    let sampleData: any[] = [];

    if (Array.isArray(data)) {
      rowCount = data.length;
      if (data.length > 0 && typeof data[0] === 'object') {
        columns = Object.keys(data[0]);
        sampleData = data.slice(0, 5);
      }
    } else if (typeof data === 'object') {
      columns = Object.keys(data);
      rowCount = 1;
      sampleData = [data];
    }

    const dataTypes: Record<string, string> = {};
    columns.forEach(column => {
      const sampleValue = sampleData[0]?.[column];
      dataTypes[column] = typeof sampleValue;
    });

    return {
      columns,
      rowCount,
      dataTypes,
      sampleData,
      fileSize
    };
  } catch {
    return {
      columns: ['Invalid JSON'],
      rowCount: 0,
      dataTypes: {},
      sampleData: [],
      fileSize
    };
  }
}

function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? `.${ext}` : 'unknown';
}

async function verifyDataset(supabase: any, datasetId: string, userId: string) {
  // Wait 30 seconds to simulate verification process
  await new Promise(resolve => setTimeout(resolve, 30000));

  try {
    // Update dataset status to verified
    const { error: updateError } = await supabase
      .from('datasets')
      .update({
        status: 'verified',
        verified_at: new Date().toISOString(),
        reward_amount: 10.00, // Base reward amount
        verification_details: {
          verified_by: 'automated_system',
          verification_date: new Date().toISOString(),
          data_integrity_check: true,
          format_validation: true
        }
      })
      .eq('id', datasetId);

    if (updateError) {
      console.error('Failed to update dataset:', updateError);
      return;
    }

    // Create earnings record
    const { error: earningsError } = await supabase
      .from('earnings')
      .insert({
        user_id: userId,
        dataset_id: datasetId,
        amount: 10.00,
        type: 'dataset_verification_reward',
        transaction_hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        status: 'completed'
      });

    if (earningsError) {
      console.error('Failed to create earnings:', earningsError);
    }

    // Update user profile with new balance
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        lot_token_balance: supabase.raw('lot_token_balance + 10'),
        total_earnings: supabase.raw('total_earnings + 10'),
        total_datasets_uploaded: supabase.raw('total_datasets_uploaded + 1')
      })
      .eq('user_id', userId);

    if (profileError) {
      console.error('Failed to update profile:', profileError);
    }

    // Create verification notification
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'reward',
        title: 'Dataset Verified & Reward Earned',
        message: 'Your dataset has been verified! You earned 10 LOT tokens.',
        data: {
          dataset_id: datasetId,
          reward_amount: 10.00,
          status: 'verified'
        }
      });

    // Log verification activity
    await supabase
      .from('user_activities')
      .insert({
        user_id: userId,
        activity_type: 'dataset_verified',
        activity_data: {
          dataset_id: datasetId,
          reward_amount: 10.00
        }
      });

    console.log(`Dataset ${datasetId} verified successfully`);

  } catch (error) {
    console.error('Verification process failed:', error);
    
    // Update dataset status to rejected on error
    await supabase
      .from('datasets')
      .update({
        status: 'rejected',
        verification_details: {
          error: 'Verification failed',
          verified_by: 'automated_system',
          verification_date: new Date().toISOString()
        }
      })
      .eq('id', datasetId);

    // Create rejection notification
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'dataset',
        title: 'Dataset Verification Failed',
        message: 'Your dataset verification failed. Please try uploading again.',
        data: {
          dataset_id: datasetId,
          status: 'rejected'
        }
      });
  }
}