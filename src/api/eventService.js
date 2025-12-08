
import { API_BASE_URL } from "../config";

// FETCH EVENTS (PUBLIC)
export async function getEvents(page = 1, limit = 6, category = "", sort = "") {
  // Backend currently returns all events at /events/all. Query params are ignored for now.
  const res = await fetch(`${API_BASE_URL}/events/all`);
  const json = await res.json();
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

// CREATE EVENT (POST) -> backend uses /events/create
export async function createEvent(data, token) {
  const res = await fetch(`${API_BASE_URL}/events/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

// UPDATE EVENT (PUT) -> backend uses /events/update/{id}
export async function updateEvent(id, data, token) {
  const res = await fetch(`${API_BASE_URL}/events/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}

// GET EVENT BY ID (PUBLIC)
export async function getEventById(id) {
  const res = await fetch(`${API_BASE_URL}/events/${id}`);

  const json = await res.json();
  if (!res.ok) throw { status: res.status, body: json };
  return json;
}
