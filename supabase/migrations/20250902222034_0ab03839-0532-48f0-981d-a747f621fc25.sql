-- Enable realtime updates for datasets table
ALTER TABLE public.datasets REPLICA IDENTITY FULL;

-- Add datasets table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.datasets;