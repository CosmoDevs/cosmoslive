"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";

export default function EventsPage() {
  const [events, setEvents] = useState([]); // SSR-safe default
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const loadEvents = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(Array.isArray(stored) ? stored : []);
      } catch {
        setEvents([]);
      }
    };

    setTimeout(loadEvents, 0);
  }, []);

  const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const paginated = events.slice(startIndex, startIndex + pageSize);

  // Format date for UI
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <div className="p-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Events</h1>

        {/* Page size dropdown */}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          className="border px-3 py-2 rounded-lg bg-white shadow-sm"
        >
          <option value="3">3 / page</option>
          <option value="6">6 / page</option>
          <option value="9">9 / page</option>
          <option value="12">12 / page</option>
        </select>
      </div>

      {/* EVENTS GRID */}
      <div className="flex-grow px-8">
        {paginated.length === 0 ? (
          <p className="text-gray-500 text-center mt-20 text-lg">
            No events created yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((ev, idx) => (
              <Card
                key={idx}
                className="p-4 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                {/* Image */}
                {ev.image && (
                  <img
                    src={ev.image}
                    alt="Event"
                    className="w-full h-40 object-cover rounded-xl shadow-sm"
                  />
                )}

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mt-3">
                  {ev.title}
                </h2>

                {/* Datetime */}
                <p className="text-sm text-gray-500 font-medium">
                  {formatDate(ev.datetime)}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {ev.description}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* PAGINATION FOOTER */}
      <div className="py-8 flex justify-center items-center gap-10 text-lg font-medium">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="w-28"
        >
          Previous
        </Button>

        <span className="w-28 text-center">
          Page {page} / {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="w-28"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
