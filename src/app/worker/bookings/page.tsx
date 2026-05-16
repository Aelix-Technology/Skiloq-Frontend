// src/app/worker/bookings/page.tsx
"use client";

import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { BookingCard } from "@/components/bookings/BookingCard";
import { ErrorState } from "@/components/shared/ErrorState";
import { useWorkerBookings } from "@/hooks/useBookings";
import { Calendar } from "lucide-react";

export default function BookingsPage() {
    const { data: bookings, isLoading, error, refetch } = useWorkerBookings();

    // Split into upcoming and past
    const now = new Date();
    const upcoming = bookings?.filter((b) => new Date(b.scheduled_at) >= now && b.status !== "completed" && b.status !== "cancelled") || [];
    const past = bookings?.filter((b) => new Date(b.scheduled_at) < now || b.status === "completed" || b.status === "cancelled") || [];

    return (
        <WorkerLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-bold text-primary">Bookings</h1>
                    <p className="text-sm text-primary-300 mt-0.5">Manage your scheduled jobs and appointments</p>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="space-y-2 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-white rounded-card border border-primary-100" />
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <ErrorState title="Couldn't load bookings" onRetry={() => refetch()} />
                )}

                {/* Content */}
                {bookings && (
                    <>
                        {/* Upcoming */}
                        <div>
                            <h2 className="text-md font-semibold text-primary mb-3">
                                Upcoming ({upcoming.length})
                            </h2>
                            {upcoming.length > 0 ? (
                                <div className="grid gap-2">
                                    {upcoming.map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-card border border-primary-100 p-6 text-center">
                                    <Calendar className="w-8 h-8 text-primary-200 mx-auto mb-2" />
                                    <p className="text-sm text-primary-300">No upcoming bookings</p>
                                    <p className="text-xs text-primary-200 mt-1">Browse opportunities to get hired</p>
                                </div>
                            )}
                        </div>

                        {/* Past */}
                        {past.length > 0 && (
                            <div>
                                <h2 className="text-md font-semibold text-primary mb-3">
                                    Past ({past.length})
                                </h2>
                                <div className="grid gap-2 opacity-60">
                                    {past.map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </WorkerLayout>
    );
}
