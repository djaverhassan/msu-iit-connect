-- Create issues table for storing reported issues
CREATE TABLE public.issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  student_id TEXT,
  category TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Admins can view all issues
CREATE POLICY "Admins can view all issues"
ON public.issues
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update issues
CREATE POLICY "Admins can update issues"
ON public.issues
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete issues
CREATE POLICY "Admins can delete issues"
ON public.issues
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone authenticated can insert issues (submit reports)
CREATE POLICY "Authenticated users can submit issues"
ON public.issues
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_issues_updated_at
BEFORE UPDATE ON public.issues
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();