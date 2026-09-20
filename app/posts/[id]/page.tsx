import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { getComments } from "@/lib/comments";
import { createComment } from "@/app/actions";
import { formatDate } from "@/lib/format";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const comments = await getComments(id);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-16">
      <Link href="/" className="text-sm text-rose-400 hover:text-rose-600">
        ← 목록으로
      </Link>

      <article className="mt-6 rounded-3xl border border-pink-100 bg-white/80 p-6 shadow-sm shadow-pink-100">
        <h1 className="text-lg font-semibold text-rose-600">{post.title}</h1>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-rose-900/70">
          {post.content}
        </p>
        <div className="mt-4 flex gap-3 text-xs text-rose-300">
          <span>🐣 익명</span>
          <span>{formatDate(post.created_at)}</span>
        </div>
      </article>

      <h2 className="mt-10 text-sm font-semibold text-rose-500">
        댓글 {comments.length}개
      </h2>

      {comments.length === 0 ? (
        <p className="mt-4 text-sm text-rose-300">
          아직 댓글이 없어요. 첫 댓글로 일정을 추천해주세요 🌸
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-2xl border border-pink-100 bg-white/70 p-4"
            >
              <p className="whitespace-pre-wrap text-sm text-rose-900/80">
                {comment.content}
              </p>
              <div className="mt-2 flex gap-3 text-xs text-rose-300">
                <span>{comment.author === "익명" ? "🐣 익명" : comment.author}</span>
                <span>{formatDate(comment.created_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form
        action={createComment.bind(null, post.id)}
        className="mt-6 flex flex-col gap-3 rounded-2xl border border-pink-100 bg-white/80 p-5"
      >
        <textarea
          name="content"
          required
          rows={3}
          placeholder="댓글로 여행 일정을 추천해주세요 :)"
          className="resize-none rounded-2xl border border-pink-200 bg-pink-50/40 px-4 py-2.5 text-sm text-rose-900 outline-none placeholder:text-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
        />
        <button
          type="submit"
          className="self-end rounded-full bg-rose-400 px-4 py-2 text-sm font-medium text-white shadow-md shadow-rose-200 transition-colors hover:bg-rose-500"
        >
          댓글 등록 💌
        </button>
      </form>
    </div>
  );
}
