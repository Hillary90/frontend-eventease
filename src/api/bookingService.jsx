// src/api/bookingService.js
import { API_BASE } from "../config";

export async function rsvp(eventId, token){
  const r = await fetch(`${API_BASE}/bookings/${eventId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!r.ok) throw r;
  return r.json();
}

export async function cancelRsvp(eventId, token){
  const r = await fetch(`${API_BASE}/bookings/${eventId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!r.ok) throw r;
  return r.json();
}

export async function getAttendees(eventId, token){
  const r = await fetch(`${API_BASE}/bookings/event/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!r.ok) throw r;
  return r.json();
}

export async function getMyBookings(token){
  const r = await fetch(`${API_BASE}/bookings/me`, { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) throw r;
  return r.json();
}
