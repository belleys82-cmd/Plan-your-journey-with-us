import { supabase } from "@/lib/supabase";

export type Comment = {
  id: string;
  post_id: string;
  content: string;
  author: string;
  created_at: string;
};

export async function getComments(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function addComment(postId: string, content: string) {
  const { error } = await supabase
    .from("comments")
    .insert({ post_id: postId, content });

  if (error) throw error;
}
