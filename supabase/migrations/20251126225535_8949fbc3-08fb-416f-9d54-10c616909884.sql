-- Create enum for publication types
CREATE TYPE public.publication_type AS ENUM (
  'silahis',
  'sidlak',
  'cassayuran',
  'motherboard',
  'sindaw',
  'adinfinitum',
  'caduceus',
  'thuum'
);

-- Create enum for author types
CREATE TYPE public.author_type AS ENUM ('publication', 'admin');

-- Create posts table
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id publication_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  author_type author_type NOT NULL DEFAULT 'publication',
  category TEXT,
  image_url TEXT,
  likes INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all posts
CREATE POLICY "Anyone can view posts"
ON public.posts
FOR SELECT
USING (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_posts_publication_id ON public.posts(publication_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);