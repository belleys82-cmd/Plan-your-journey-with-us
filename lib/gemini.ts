const MODEL = "gemini-3.5-flash";

export async function generateAiComment(
  title: string,
  content: string,
): Promise<string | null> {
  const prompt = `너는 여행 게시판의 친절한 AI 여행 큐레이터야. 아래 여행 조건 글을 읽고, 구체적인 여행 일정이나 코스를 2~4문장으로 짧게 추천하는 댓글을 한국어로 작성해줘. 인사말이나 부연 설명 없이 추천 내용만 바로 말해.

제목: ${title}
내용: ${content}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    },
  );

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof text === "string" ? text.trim() : null;
}
