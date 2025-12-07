import React from 'react';

const AttendeeListModal = ({ attendees, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Attendees</h2>
        {attendees.length > 0 ? (
          <ul className="space-y-2">
            {attendees.map(attendee => (
              <li key={attendee.id} className="border-b pb-2">
                <p className="font-medium">{attendee.name}</p>
                <p className="text-sm text-gray-600">{attendee.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No attendees yet.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AttendeeListModal;
