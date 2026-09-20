import { supabase } from "@/lib/supabase";

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
};

export type PostWithCommentCount = Post & { comment_count: number };

export async function getPosts(): Promise<PostWithCommentCount[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, comments(count)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(({ comments, ...post }) => ({
    ...post,
    comment_count: comments[0]?.count ?? 0,
  }));
}

export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function addPost(title: string, content: string) {
  const { error } = await supabase.from("posts").insert({ title, content });
  if (error) throw error;
}
