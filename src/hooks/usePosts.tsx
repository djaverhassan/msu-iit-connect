import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subDays, format } from "date-fns";

export type PublicationType = 
  | "silahis"
  | "sidlak"
  | "cassayuran"
  | "motherboard"
  | "sindaw"
  | "adinfinitum"
  | "caduceus"
  | "thuum";

export type AuthorType = "publication" | "admin";

export interface Post {
  id: string;
  publication_id: PublicationType;
  title: string;
  content: string;
  excerpt: string | null;
  author: string;
  author_type: AuthorType;
  category: string | null;
  image_url: string | null;
  facebook_url: string | null;
  likes: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

interface UsePostsOptions {
  publicationId?: PublicationType;
  recentDays?: number;
}

export const usePosts = (options?: PublicationType | UsePostsOptions) => {
  // Handle both old string param and new options object
  const publicationId = typeof options === 'string' ? options : options?.publicationId;
  const recentDays = typeof options === 'object' ? options?.recentDays : undefined;

  return useQuery({
    queryKey: ["posts", publicationId, recentDays],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (publicationId) {
        query = query.eq("publication_id", publicationId);
      }

      // Filter to only recent posts if recentDays is specified
      if (recentDays) {
        const cutoffDate = subDays(new Date(), recentDays);
        query = query.gte("created_at", cutoffDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Post[];
    },
  });
};
