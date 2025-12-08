
import { API_BASE } from "../config";

// FETCH EVENTS (PUBLIC)
// Pagination, category & sort supported
export async function getEvents(page = 1, limit = 6, category = "", sort = "") {
  const url = new URL(`${API_BASE}/events`);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);
  if (category) url.searchParams.append("category", category);
  if (sort) url.searchParams.append("sort", sort);

  const response = await fetch(url);
  return await response.json();
}

// CREATE EVENT (POST)
// Requires JWT token
export async function createEvent(data, token) {
  const res = await fetch(`${API_BASE}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

// UPDATE EVENT (PUT)
// Requires JWT token

export async function updateEvent(id, data, token) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

// GET EVENT BY ID (PUBLIC)
export async function getEventById(id) {
  const res = await fetch(`${API_BASE}/events/${id}`);

  const json = await res.json();
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}
