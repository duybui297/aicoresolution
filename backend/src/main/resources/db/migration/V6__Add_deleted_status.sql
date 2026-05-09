-- Update post_status enum to include DELETED for soft delete support
ALTER TYPE post_status ADD VALUE 'DELETED';
