// Fetch events from backend only
export async function getEvents(page = 1, limit = 6, category = "", sort = "") {
  const url = new URL("http://127.0.0.1:8000/events");
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);
  if (category) url.searchParams.append("category", category);
  if (sort) url.searchParams.append("sort", sort);

  const response = await fetch(url);
  return await response.json();
}
