-- Add user_id column to issues table for tracking
ALTER TABLE public.issues ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create RLS policy for users to view their own issues
CREATE POLICY "Users can view their own issues"
ON public.issues
FOR SELECT
USING (auth.uid() = user_id);