import React from "react";

function EventFilters({ setCategory, setSort }) {
  return (
    <div className="flex gap-2 mb-4">
      <select
        className="border p-1"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="music">Music</option>
        <option value="tech">Tech</option>
        <option value="sports">Sports</option>
      </select>

      <select
        className="border p-1"
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort: Default</option>
        <option value="latest">Latest</option>
      </select>
    </div>
  );
}

export default EventFilters;
