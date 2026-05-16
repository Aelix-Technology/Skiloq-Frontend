// src/types/messages.ts
export interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: "worker" | "employer";
  content: string;
  attachment?: {
    name: string;
    url: string;
    type: "image" | "pdf" | "document";
    size: string;
  };
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export interface Thread {
  id: string;
  other_user_name: string;
  other_user_role: "employer";
  other_user_avatar?: string;
  job_title: string;
  job_id: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  is_active: boolean; // Booking still active
}

export interface ThreadListResponse {
  threads: Thread[];
}

export interface ThreadMessagesResponse {
  thread_id: string;
  messages: Message[];
  other_user_name: string;
  job_title: string;
}
