import Link from "next/link";
import { getPosts } from "@/lib/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Home() {
  const posts = getPosts();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-16">
      <header className="flex flex-col items-center gap-2 text-center">
        <span className="text-2xl">🌷 ✈️ 💌</span>
        <h1 className="font-display text-3xl font-bold text-rose-500">
          Plan your journey with us
        </h1>
        <p className="text-sm text-rose-400">
          여행 조건을 남겨주시면, 다른 여행자들이 일정을 추천해드려요 :)
        </p>
      </header>

      <div className="mt-10 flex items-center justify-between">
        <span className="text-sm text-rose-400">전체 {posts.length}개의 글</span>
        <Link
          href="/write"
          className="rounded-full bg-rose-400 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-rose-200 transition-colors hover:bg-rose-500"
        >
          ✏️ 글쓰기
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-sm text-rose-300">
          아직 등록된 글이 없어요. 첫 여행 조건을 남겨보세요 🌸
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-3xl border border-pink-100 bg-white/80 p-6 shadow-sm shadow-pink-100"
            >
              <h2 className="text-base font-semibold text-rose-600">{post.title}</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-rose-900/70">
                {post.content}
              </p>
              <div className="mt-3 flex gap-3 text-xs text-rose-300">
                <span>🐣 익명</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
