// src/app/worker/bookings/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { WorkerLayout } from "@/components/layout/WorkerLayout";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { SOSButton } from "@/components/bookings/SOSButton";
import { ErrorState } from "@/components/shared/ErrorState";
import { useBooking } from "@/hooks/useBookings";
import { ArrowLeft, MapPin, Clock, Calendar, Phone, MessageCircle, Info } from "lucide-react";

export default function BookingDetailPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params.id as string;
    const { data: booking, isLoading, error, refetch } = useBooking(bookingId);

    if (isLoading) {
        return (
            <WorkerLayout>
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-primary-100 rounded w-32" />
                    <div className="h-40 bg-white rounded-card border border-primary-100" />
                </div>
            </WorkerLayout>
        );
    }

    if (error || !booking) {
        return (
            <WorkerLayout>
                <ErrorState title="Booking not found" onRetry={() => refetch()} />
            </WorkerLayout>
        );
    }

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
            time: date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        };
    };

    const { date, time } = formatDateTime(booking.scheduled_at);
    const durationHours = Math.floor(booking.duration_minutes / 60);
    const durationMins = booking.duration_minutes % 60;
    const durationText = durationHours > 0
        ? `${durationHours} hour${durationHours > 1 ? "s" : ""}${durationMins > 0 ? ` ${durationMins} min` : ""}`
        : `${durationMins} minutes`;

    return (
        <WorkerLayout>
            <div className="space-y-6">
                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-sm text-primary-300 hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to bookings
                </button>

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-primary">{booking.service_type}</h1>
                        <p className="text-sm text-primary-300 mt-0.5">{booking.client_name}</p>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                </div>

                {/* Fee */}
                <p className="text-2xl font-bold text-accent">GHS {booking.fee_ghs.toLocaleString()}</p>

                {/* Details card */}
                <div className="bg-white rounded-card border border-primary-100 divide-y divide-primary-50">
                    <div className="flex items-center gap-3 p-4">
                        <Calendar className="w-4 h-4 text-primary-300 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-primary">{date}</p>
                            <p className="text-xs text-primary-300">{time}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4">
                        <Clock className="w-4 h-4 text-primary-300 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-primary">{durationText}</p>
                            <p className="text-xs text-primary-300">Estimated duration</p>
                        </div>
                    </div>

                    {booking.is_in_person && booking.location && (
                        <div className="flex items-center gap-3 p-4">
                            <MapPin className="w-4 h-4 text-primary-300 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-primary">{booking.location}</p>
                                <p className="text-xs text-primary-300">Service location</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3 p-4">
                        <Phone className="w-4 h-4 text-primary-300 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-primary">{booking.client_phone}</p>
                            <p className="text-xs text-primary-300">Client contact</p>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                {booking.notes && (
                    <div className="bg-warning/5 border border-warning/20 rounded-card p-4">
                        <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-warning mb-0.5">Client Notes</p>
                                <p className="text-sm text-primary-300">{booking.notes}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                {booking.status !== "completed" && booking.status !== "cancelled" && (
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push(`/worker/messages/${booking.id}`)}
                            className="w-full flex items-center justify-center gap-2 bg-accent text-white font-semibold py-3.5 rounded-input hover:bg-accent-600 transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Message Client
                        </button>
                    </div>
                )}

                {/* SOS — only for in-person active bookings */}
                {booking.is_in_person && (booking.status === "confirmed" || booking.status === "in_progress") && (
                    <div className="bg-danger/5 border-2 border-danger/20 rounded-card p-4">
                        <SOSButton bookingId={booking.id} clientName={booking.client_name} />
                    </div>
                )}
            </div>
        </WorkerLayout>
    );
}