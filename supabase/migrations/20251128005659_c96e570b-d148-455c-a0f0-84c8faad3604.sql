-- Add facebook_url field to posts table for Facebook post embeds
ALTER TABLE public.posts ADD COLUMN facebook_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.posts.facebook_url IS 'URL to the Facebook post for embedding';

-- Create index for faster queries
CREATE INDEX idx_posts_facebook_url ON public.posts(facebook_url) WHERE facebook_url IS NOT NULL;