// src/app/employer/messages/page.tsx
"use client";

import { EmployerLayout } from "@/components/layout/EmployerLayout";
import { MessageCircle } from "lucide-react";

export default function EmployerMessagesPage() {
  return (
    <EmployerLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-primary">Messages</h1>
          <p className="text-sm text-primary-300 mt-0.5">Chat with workers after booking is confirmed</p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-primary-200" />
          </div>
          <h3 className="text-md font-semibold text-primary mb-1">No messages yet</h3>
          <p className="text-sm text-primary-300">
            Messages are available after you hire a worker and a booking is confirmed.
          </p>
        </div>
      </div>
    </EmployerLayout>
  );
}
