import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventDetailsCard from '../components/Events/EventDetailsCard';
import AttendeeListModal from '../components/Events/AttendeeListModal';
import { getEventById, rsvp, cancelRsvp, getAttendees, getMyBookings, isOrganizer } from '../api/bookingService';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [userBooked, setUserBooked] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [showAttendees, setShowAttendees] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, bookings] = await Promise.all([
          getEventById(id),
          getMyBookings()
        ]);
        setEvent(eventData);
        setUserBooked(bookings.some(booking => booking.eventId === id));
      } catch (err) {
        if (err.message === 'Not authenticated') {
          navigate('/login');
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleRsvp = async () => {
    try {
      await rsvp(id);
      setUserBooked(true);
      
      const updatedEvent = await getEventById(id);
      setEvent(updatedEvent);
    } catch (err) {
      if (err.message === 'Not authenticated') {
        navigate('/login');
        return;
      }
      setError(err.message);
    }
  };

  const handleCancelRsvp = async () => {
    try {
      await cancelRsvp(id);
      setUserBooked(false);
      
      const updatedEvent = await getEventById(id);
      setEvent(updatedEvent);
    } catch (err) {
      if (err.message === 'Not authenticated') {
        navigate('/login');
        return;
      }
      setError(err.message);
    }
  };

  const handleViewAttendees = async () => {
    try {
      const attendeesData = await getAttendees(id);
      setAttendees(attendeesData);
      setShowAttendees(true);
    } catch (err) {
      if (err.message === 'Not authenticated') {
        navigate('/login');
        return;
      }
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="container mx-auto p-4">
      <EventDetailsCard
        event={{ ...event, isRsvped: userBooked }}
        onRsvp={handleRsvp}
        onCancelRsvp={handleCancelRsvp}
        onViewAttendees={handleViewAttendees}
        isOrganizer={isOrganizer(event, userId)}
      />
      {showAttendees && (
        <AttendeeListModal
          attendees={attendees}
          onClose={() => setShowAttendees(false)}
        />
      )}
    </div>
  );
};

export default EventDetailsPage;

