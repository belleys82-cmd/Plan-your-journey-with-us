import Link from "next/link";
import { createPost } from "@/app/actions";

export default function WritePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-16">
      <Link href="/" className="text-sm text-rose-400 hover:text-rose-600">
        ← 목록으로
      </Link>

      <h1 className="mt-6 font-display text-2xl font-bold text-rose-500">글쓰기 🌷</h1>
      <p className="mt-1 text-sm text-rose-400">작성자는 익명으로 표시됩니다.</p>

      <form
        action={createPost}
        className="mt-10 flex flex-col gap-6 rounded-3xl border border-pink-100 bg-white/80 p-8 shadow-sm shadow-pink-100"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-rose-500">
            제목 ✏️
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={100}
            placeholder="예: 제주도 3박 4일, 아이 동반 코스 추천해주세요"
            className="rounded-2xl border border-pink-200 bg-pink-50/40 px-4 py-2.5 text-sm text-rose-900 outline-none placeholder:text-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-sm font-medium text-rose-500">
            여행 조건 🧳
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            placeholder="인원, 기간, 예산, 이동수단, 선호하는 스타일 등을 적어주시면 다른 여행자들이 일정을 추천해드려요."
            className="resize-none rounded-2xl border border-pink-200 bg-pink-50/40 px-4 py-2.5 text-sm text-rose-900 outline-none placeholder:text-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full bg-rose-400 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-rose-200 transition-colors hover:bg-rose-500"
        >
          등록하기 💌
        </button>
      </form>
    </div>
  );
}
