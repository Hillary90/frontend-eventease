// src/pages/EditEventPage.jsx
// ------------------------------------------------------------
// This page loads an existing event and allows the organizer
// to edit it using the same EventForm component.
// ------------------------------------------------------------

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../component/EventForm";
import { getEventById, updateEvent } from "../api/eventService";
import { AuthContext } from "../context/AuthContext";

export default function EditEventPage() {
  const { id } = useParams(); // event ID from URL
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Local state for loading, errors, and initial data
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ------------------------------------------------------------
  // Load event details when the page loads
  // ------------------------------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const ev = await getEventById(id);

        // Security check: Only organizer can edit
        if (ev.organizer_id !== user.id) {
          setError("You are not authorized to edit this event.");
          return;
        }

        setInitial(ev);
      } catch {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, user]);

  // ------------------------------------------------------------
  // Runs when the user saves changes
  // ------------------------------------------------------------
  const handleUpdate = async (payload) => {
    try {
      setError(null);
      setSubmitting(true);

      const updated = await updateEvent(id, payload, token);

      // Redirect after saving
      navigate(`/event/${updated.id}`);
    } catch (err) {
      setError(err.body?.detail || "Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4">
      {/* Reuse EventForm but give initial data */}
      <EventForm
        initial={initial}
        onSubmit={handleUpdate}
        submitting={submitting}
        submitLabel="Save Changes"
      />
    </div>
  );
}
