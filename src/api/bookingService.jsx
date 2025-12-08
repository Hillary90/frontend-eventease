// src/api/bookingService.js
import { API_BASE_URL } from "../config";

export async function rsvp(eventId, token) {
  const r = await fetch(`${API_BASE_URL}/bookings/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ event_id: eventId }),
  });
  if (!r.ok) throw r;
  return r.json();
}

export async function cancelRsvp(eventId, token) {
  const r = await fetch(`${API_BASE_URL}/bookings/cancel`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ event_id: eventId }),
  });
  if (!r.ok) throw r;
  return r.json();
}

export async function getAttendees(eventId, token) {
  const r = await fetch(`${API_BASE_URL}/bookings/event/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw r;
  return r.json();
}

export async function getMyBookings(token) {
  const r = await fetch(`${API_BASE_URL}/bookings/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw r;
  return r.json();
}
