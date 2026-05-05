// src/hooks/useBookings.ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockBookings } from "@/lib/mock-bookings";
import { mockDelay } from "@/lib/mock-delay";
import type { Booking } from "@/types/job";

export function useWorkerBookings() {
  return useQuery<Booking[]>({
    queryKey: ["workers", "bookings"],
    queryFn: async () => {
      // TODO: Replace with apiClient.get("/bookings/worker/upcoming")
      await mockDelay(500);
      return mockBookings;
    },
    staleTime: 30 * 1000,
  });
}

export function useBooking(id: string) {
  return useQuery<Booking | null>({
    queryKey: ["bookings", id],
    queryFn: async () => {
      // TODO: Replace with apiClient.get(`/bookings/${id}`)
      await mockDelay(300);
      return mockBookings.find((b) => b.id === id) || null;
    },
    enabled: !!id,
  });
}