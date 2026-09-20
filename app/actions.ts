"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addPost } from "@/lib/posts";

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) return;

  addPost(title, content);
  revalidatePath("/");
  redirect("/");
}
