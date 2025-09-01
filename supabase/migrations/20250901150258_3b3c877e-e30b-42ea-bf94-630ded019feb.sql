-- Enable real-time updates for datasets table
ALTER TABLE public.datasets REPLICA IDENTITY FULL;

-- Add the datasets table to the realtime publication
INSERT INTO supabase_realtime.subscription (
    subscription_id,
    entity,
    filters,
    claims,
    created_at
) VALUES (
    'datasets_realtime',
    'datasets',
    '[]',
    '{}',
    NOW()
) ON CONFLICT DO NOTHING;