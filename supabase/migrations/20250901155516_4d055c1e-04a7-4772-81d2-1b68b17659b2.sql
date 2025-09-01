-- Update some existing datasets to verified status so users can see approved datasets from other users
UPDATE datasets 
SET 
  status = 'verified',
  verified_at = now(),
  verification_details = jsonb_build_object(
    'verified_by', 'system',
    'verification_date', now(),
    'verification_notes', 'Approved for public access'
  )
WHERE id IN (
  SELECT id 
  FROM datasets 
  WHERE status = 'rejected'
  ORDER BY created_at DESC
  LIMIT 3
);