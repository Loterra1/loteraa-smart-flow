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
  // Wait 5 seconds to simulate verification process  
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log(`Starting verification for dataset ${datasetId}`);

  try {
    // Get dataset information including file structure
    const { data: dataset, error: fetchError } = await supabase
      .from('datasets')
      .select('file_structure, name')
      .eq('id', datasetId)
      .single();

    if (fetchError) {
      console.error('Failed to fetch dataset:', fetchError);
      throw fetchError;
    }

    const fileStructure = dataset.file_structure;
    console.log('File structure analysis:', fileStructure);
    
    // Enhanced validation for meaningful datasets
    const isBlankDataset = !fileStructure || 
                          fileStructure.rowCount === 0 || 
                          !fileStructure.columns || 
                          fileStructure.columns.length === 0 ||
                          !fileStructure.sampleData || 
                          fileStructure.sampleData.length === 0 ||
                          // Check if all sample data is empty
                          fileStructure.sampleData.every((row: any) => 
                            Object.values(row).every(val => !val || val.toString().trim() === '')
                          );

    if (isBlankDataset) {
      console.log(`Dataset ${datasetId} rejected - blank/empty dataset`);
      
      // Reject blank dataset
      const { error: updateError } = await supabase
        .from('datasets')
        .update({
          status: 'rejected',
          reward_amount: 0,
          verification_details: {
            verified_by: 'automated_system',
            verification_date: new Date().toISOString(),
            rejection_reason: 'Dataset is blank or contains no meaningful data',
            data_integrity_check: false,
            format_validation: false
          }
        })
        .eq('id', datasetId);

      if (updateError) {
        console.error('Failed to update dataset to rejected:', updateError);
        return;
      }

      // Create rejection notification
      await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type: 'dataset',
          title: 'Dataset Rejected',
          message: `Your dataset "${dataset.name}" was rejected because it contains no meaningful data. Please upload a dataset with actual content.`,
          data: {
            dataset_id: datasetId,
            status: 'rejected',
            reason: 'blank_dataset'
          }
        });

      // Log rejection activity
      await supabase
        .from('user_activities')
        .insert({
          user_id: userId,
          activity_type: 'dataset_rejected',
          activity_data: {
            dataset_id: datasetId,
            reason: 'blank_dataset'
          }
        });

      return;
    }

    // Dataset has meaningful data - start approval process
    console.log(`Dataset ${datasetId} passed validation, starting approval process`);

    // 1) Mark dataset as verified
    const { error: verifyUpdateError } = await supabase
      .from('datasets')
      .update({
        status: 'verified',
        verified_at: new Date().toISOString(),
        reward_amount: 250.0,
        verification_details: {
          verified_by: 'automated_system',
          verification_date: new Date().toISOString(),
          data_integrity_check: true,
          format_validation: true,
          row_count: fileStructure.rowCount,
          column_count: fileStructure.columns.length,
        },
      })
      .eq('id', datasetId);

    if (verifyUpdateError) {
      console.error('Failed to set dataset verified:', verifyUpdateError);
      throw verifyUpdateError;
    }

    console.log(`Dataset ${datasetId} marked as verified`);

    // 2) Create earnings record
    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    const { error: earningsError } = await supabase
      .from('earnings')
      .insert({
        user_id: userId,
        dataset_id: datasetId,
        amount: 250.0,
        type: 'dataset_verification_reward',
        transaction_hash: transactionHash,
        status: 'completed',
      });

    if (earningsError) {
      console.error('Failed to create earnings:', earningsError);
      // Roll back dataset verification
      await supabase
        .from('datasets')
        .update({ status: 'rejected', reward_amount: 0 })
        .eq('id', datasetId);
      throw earningsError;
    }

    console.log('Earnings record created');

    // 3) Create or update user profile directly
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('lot_token_balance, total_earnings, total_datasets_uploaded')
      .eq('user_id', userId)
      .maybeSingle();

    const newBalance = (existingProfile?.lot_token_balance || 0) + 250.0;
    const newEarnings = (existingProfile?.total_earnings || 0) + 250.0;
    const newDatasets = (existingProfile?.total_datasets_uploaded || 0) + 1;

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: userId,
        lot_token_balance: newBalance,
        total_earnings: newEarnings,
        total_datasets_uploaded: newDatasets,
      }, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      });

    if (profileError) {
      console.error('Failed to upsert profile:', profileError);
      
      // Clean up earnings and revert dataset
      await supabase
        .from('earnings')
        .delete()
        .eq('user_id', userId)
        .eq('dataset_id', datasetId);
      
      await supabase
        .from('datasets')
        .update({ status: 'rejected', reward_amount: 0 })
        .eq('id', datasetId);
      
      throw profileError;
    }

    console.log(`Profile updated - balance: ${newBalance}, earnings: ${newEarnings}, datasets: ${newDatasets}`);

    // 4) Send success notifications
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'reward',
        title: 'Dataset Verified & Reward Earned',
        message: `Your dataset "${dataset.name}" has been verified! You earned 250 LOT tokens.`,
        data: {
          dataset_id: datasetId,
          reward_amount: 250.0,
          status: 'verified',
          transaction_hash: transactionHash,
          explorer_link: `https://explorer.loteraa.com/tx/${transactionHash}`,
        },
      });

    await supabase
      .from('user_activities')
      .insert({
        user_id: userId,
        activity_type: 'dataset_verified',
        activity_data: { 
          dataset_id: datasetId, 
          reward_amount: 250.0,
          new_balance: newBalance
        },
      });

    console.log(`Dataset ${datasetId} verified successfully with full rewards`);

  } catch (error) {
    console.error('Verification process failed:', error);
    
    // Always ensure dataset is marked as rejected on any failure
    await supabase
      .from('datasets')
      .update({
        status: 'rejected',
        reward_amount: 0,
        verification_details: {
          error: error.message || 'Verification failed',
          verified_by: 'automated_system',
          verification_date: new Date().toISOString(),
        },
      })
      .eq('id', datasetId);

    // Send rejection notification
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'dataset',
        title: 'Dataset Verification Failed',
        message: 'Your dataset verification encountered an error. Please try uploading again.',
        data: {
          dataset_id: datasetId,
          status: 'rejected',
          error: error.message
        },
      });

    console.log(`Dataset ${datasetId} marked as rejected due to verification failure`);
  }
}