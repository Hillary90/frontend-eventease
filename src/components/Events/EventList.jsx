import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";
import { getEvents } from "../../api/eventService";

function EventList({ navigateToEvent }) {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    loadEvents(1, true);
  }, [category, sort]);

  async function loadEvents(pageNum = 1, reset = false) {
    const data = await getEvents(pageNum, 6, category, sort);
    if (reset) {
      setEvents(data);
    } else {
      setEvents((prev) => [...prev, ...data]);
    }
  }

  return (
    <div>
      <EventFilters setCategory={setCategory} setSort={setSort} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length === 0 ? (
          <p className="border p-4 text-center">No events found</p>
        ) : (
          events.map((event) => (
            <EventCard key={event.id} event={event} onClick={navigateToEvent} />
          ))
        )}
      </div>

      {events.length > 0 && (
        <button
          className="border p-2 mt-4 block mx-auto"
          onClick={() => {
            setPage(page + 1);
            loadEvents(page + 1);
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default EventList;
