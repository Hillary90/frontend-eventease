import React from 'react';

const EventDetailsCard = ({ event, onRsvp, onCancelRsvp, onViewAttendees, isOrganizer }) => {
  return (
    <div className="bg-white shadow-md rounded p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-sm text-gray-500 mb-2">Date: {new Date(event.date).toLocaleString()}</p>
      <p className="text-sm text-gray-500 mb-4">Location: {event.location}</p>
      <p className="text-sm text-gray-600 mb-4">Attendees: {event.attendeeCount}</p>

      <div className="flex space-x-2">
        {event.isRsvped ? (
          <button
            onClick={onCancelRsvp}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel RSVP
          </button>
        ) : (
          <button
            onClick={onRsvp}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            RSVP
          </button>
        )}

        {isOrganizer && (
          <button
            onClick={onViewAttendees}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View Attendees
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetailsCard;
