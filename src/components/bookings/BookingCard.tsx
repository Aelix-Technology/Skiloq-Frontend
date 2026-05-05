// src/components/bookings/BookingCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { MapPin, Clock, Calendar, ChevronRight, Phone } from "lucide-react";
import { BookingStatusBadge } from "./BookingStatusBadge";
import type { Booking } from "@/types/job";

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = new Date(now.setDate(now.getDate() + 1)).toDateString() === date.toDateString();

    const dayLabel = isToday ? "Today" : isTomorrow ? "Tomorrow" : date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
    const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    return { dayLabel, time };
  };

  const { dayLabel, time } = formatDate(booking.scheduled_at);
  const durationHours = Math.floor(booking.duration_minutes / 60);
  const durationMins = booking.duration_minutes % 60;
  const durationText = durationHours > 0
    ? `${durationHours}h${durationMins > 0 ? ` ${durationMins}m` : ""}`
    : `${durationMins}m`;

  return (
    <button
      onClick={() => router.push(`/worker/bookings/${booking.id}`)}
      className="w-full bg-white rounded-card border border-primary-100 p-4 text-left hover:border-accent-200 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-primary truncate">{booking.service_type}</h3>
          <p className="text-xs text-primary-300 mt-0.5">{booking.client_name}</p>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="flex items-center gap-3 text-xs text-primary-300 mb-2">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {dayLabel}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {time} • {durationText}
        </span>
      </div>

      {booking.is_in_person && booking.location && (
        <div className="flex items-start gap-1 text-xs text-primary-300 mb-2">
          <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
          <span className="truncate">{booking.location}</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-primary-50">
        <span className="text-sm font-bold text-primary">
          GHS {booking.fee_ghs.toLocaleString()}
        </span>
        <ChevronRight className="w-4 h-4 text-primary-200" />
      </div>
    </button>
  );
}