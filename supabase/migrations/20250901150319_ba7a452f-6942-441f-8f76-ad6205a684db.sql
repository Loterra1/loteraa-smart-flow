-- Enable real-time updates for datasets table
ALTER TABLE public.datasets REPLICA IDENTITY FULL;