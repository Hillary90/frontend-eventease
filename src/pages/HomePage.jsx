import React from "react";
import EventList from "../components/Events/EventList";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function navigateToEvent(id) {
    navigate(`/event/${id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 border-b pb-2 text-center">
        Event Feed
      </h1>
      <EventList navigateToEvent={navigateToEvent} />
      {/* temporary comment to enable git commit */}
    </div>
  );
}

export default HomePage;
