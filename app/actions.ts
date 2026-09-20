"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addPost } from "@/lib/posts";
import { addComment } from "@/lib/comments";

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) return;

  await addPost(title, content);
  revalidatePath("/");
  redirect("/");
}

export async function createComment(postId: string, formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();

  if (!content) return;

  await addComment(postId, content);
  revalidatePath(`/posts/${postId}`);
}
