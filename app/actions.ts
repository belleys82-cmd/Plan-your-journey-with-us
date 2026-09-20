"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addPost } from "@/lib/posts";
import { addComment } from "@/lib/comments";
import { generateAiComment } from "@/lib/gemini";

const AI_COMMENT_AUTHOR = "🤖 AI 여행 큐레이터";

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) return;

  const post = await addPost(title, content);

  try {
    const aiReply = await generateAiComment(title, content);
    if (aiReply) {
      await addComment(post.id, aiReply, AI_COMMENT_AUTHOR);
    }
  } catch {
    // AI comment is a nice-to-have; a Gemini failure shouldn't block posting.
  }

  revalidatePath("/");
  redirect("/");
}

export async function createComment(postId: string, formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();

  if (!content) return;

  await addComment(postId, content);
  revalidatePath(`/posts/${postId}`);
}
