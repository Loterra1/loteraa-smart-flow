import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    const { datasetId, userId } = await req.json();

    if (!datasetId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Dataset ID and User ID are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get dataset information
    const { data: dataset, error: datasetError } = await supabase
      .from('datasets')
      .select('*')
      .eq('id', datasetId)
      .eq('status', 'verified')
      .single();

    if (datasetError || !dataset) {
      return new Response(
        JSON.stringify({ error: 'Dataset not found or not verified' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if payment is required
    let paymentStatus = 'free';
    let paymentAmount = 0;

    if (dataset.access_type === 'paid' && dataset.access_price > 0) {
      paymentAmount = dataset.access_price;
      paymentStatus = 'paid'; // In real implementation, integrate with payment system
    }

    // Record the download
    const { error: downloadError } = await supabase
      .from('downloads')
      .insert({
        user_id: userId,
        dataset_id: datasetId,
        payment_amount: paymentAmount,
        payment_status: paymentStatus,
        download_url: dataset.file_url
      });

    if (downloadError) {
      console.error('Failed to record download:', downloadError);
    }

    // Update download count
    await supabase
      .from('datasets')
      .update({
        download_count: supabase.raw('download_count + 1')
      })
      .eq('id', datasetId);

    // Log user activity
    await supabase
      .from('user_activities')
      .insert({
        user_id: userId,
        activity_type: 'dataset_download',
        activity_data: {
          dataset_id: datasetId,
          dataset_name: dataset.name,
          payment_amount: paymentAmount
        }
      });

    // Create notification for download
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'dataset',
        title: 'Dataset Downloaded',
        message: `You have successfully downloaded "${dataset.name}".`,
        data: {
          dataset_id: datasetId,
          download_url: dataset.file_url
        }
      });

    // Generate payment report if needed
    let paymentReport = null;
    if (paymentAmount > 0) {
      paymentReport = {
        transactionId: `tx_${Math.random().toString(16).substr(2, 12)}`,
        amount: paymentAmount,
        timestamp: new Date().toISOString(),
        datasetName: dataset.name,
        downloadUrl: `https://loteraa.com/downloads/${datasetId}/report`
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl: dataset.file_url,
        paymentReport: paymentReport,
        dataset: {
          id: dataset.id,
          name: dataset.name,
          description: dataset.description,
          file_type: dataset.file_type,
          file_size: dataset.file_size
        }
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