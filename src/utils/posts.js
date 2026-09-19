export async function getPosts() {
  const response = await fetch("/data/posts.json");

  if (!response.ok) {
    throw new Error("Unable to load posts data");
  }

  const data = await response.json();
  return data.posts ?? [];
}

export function formatArabicDate(date) {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function splitContent(content) {
  return content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);
}
