export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

// In-memory only: resets whenever the server restarts. No database, nothing written to disk.
const posts: Post[] = [
  {
    id: "seed-1",
    title: "제주도 3박 4일, 아이 동반 렌터카 여행 코스 추천해주세요",
    content:
      "성인 2명, 7세 아이 1명이고 렌터카로 이동할 예정이에요. 오름보다는 실내 위주 코스 위주로 추천 부탁드려요.",
    author: "익명",
    createdAt: new Date("2026-09-18T09:00:00").toISOString(),
  },
  {
    id: "seed-2",
    title: "예산 50만원, 부산 1박 2일 코스 추천해주세요",
    content: "금요일 저녁 도착, 일요일 오전 출발입니다. 대중교통만 이용해요.",
    author: "익명",
    createdAt: new Date("2026-09-19T15:30:00").toISOString(),
  },
];

export function getPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function addPost(title: string, content: string): Post {
  const post: Post = {
    id: crypto.randomUUID(),
    title,
    content,
    author: "익명",
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  return post;
}
