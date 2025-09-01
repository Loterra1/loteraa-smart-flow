-- Remove Large Language Model Training Dataset from verified status as it doesn't contain actual data
UPDATE datasets 
SET 
  status = 'rejected',
  verified_at = NULL,
  verification_details = jsonb_build_object(
    'rejected_by', 'system',
    'rejection_date', now(),
    'rejection_reason', 'Dataset does not contain actual IoT data'
  )
WHERE name = 'Large Language Model Training Dataset';