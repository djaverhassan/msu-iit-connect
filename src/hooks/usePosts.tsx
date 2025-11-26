import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  likes: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export const usePosts = (publicationId?: PublicationType) => {
  return useQuery({
    queryKey: ["posts", publicationId],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (publicationId) {
        query = query.eq("publication_id", publicationId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Post[];
    },
  });
};
