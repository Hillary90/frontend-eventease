import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventDetailsCard from '../component/EventDetailsCard';
import AttendeeListModal from '../component/AttendeeListModal';
import { rsvp, cancelRsvp, getAttendees, getMyBookings } from '../api/bookingService';
import { getEventById } from '../api/eventService';
import { AuthContext } from '../context/AuthContext';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [userBooked, setUserBooked] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [showAttendees, setShowAttendees] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, bookings] = await Promise.all([
          getEventById(id),
          getMyBookings(token)
        ]);
        setEvent(eventData);
        setUserBooked(bookings.some(booking => String(booking.event_id) === String(id)));
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
      await rsvp(id, token);
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
      await cancelRsvp(id, token);
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
      const attendeesData = await getAttendees(id, token);
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

  const isOrganizer = (event, user) => {
    if (!event || !user) return false;
    return String(event.organizer_id) === String(user.id || user);
  };

  return (
    <div className="container mx-auto p-4">
      <EventDetailsCard
        event={{ ...event, isRsvped: userBooked }}
        onRsvp={handleRsvp}
        onCancelRsvp={handleCancelRsvp}
        onViewAttendees={handleViewAttendees}
        isOrganizer={isOrganizer(event, user)}
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

