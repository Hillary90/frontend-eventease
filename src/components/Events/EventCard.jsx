import React from "react";

function EventCard({ event, onClick }) {
  return (
    <div 
      className="border p-4 cursor-pointer hover:shadow"
      onClick={() => onClick(event.id)}
    >
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p className="mt-2">{event.description}</p>
      <p className="mt-1 text-sm">Date: {event.date}</p>
      <p className="mt-1 text-sm">Category: {event.category}</p>
    </div>
  );
}

export default EventCard;
