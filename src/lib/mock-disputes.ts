// src/lib/mock-disputes.ts
import type { Dispute, DisputeMessage } from "@/types/job";

export const mockDisputes: Dispute[] = [
  {
    id: "d001",
    job_id: "j013",
    reporter_id: "e003",
    reporter_type: "employer",
    respondent_id: "w001",
    respondent_type: "worker",
    subject: "Delay in milestone delivery",
    description: "The first milestone was due on March 1st but hasn't been delivered yet. Worker has been unresponsive for 3 days.",
    evidence_urls: [],
    status: "in_review",
    created_at: "2026-03-03T10:00:00Z",
    updated_at: "2026-03-03T14:30:00Z",
    assigned_agent_id: "a001",
  },
  {
    id: "d002",
    job_id: "j001",
    reporter_id: "w003",
    reporter_type: "worker",
    respondent_id: "e001",
    respondent_type: "employer",
    subject: "Payment not released after completion",
    description: "I completed the project on time, but the employer hasn't released payment for 2 weeks despite multiple follow-ups.",
    evidence_urls: [],
    status: "open",
    created_at: "2026-03-02T09:15:00Z",
    updated_at: "2026-03-02T09:15:00Z",
  },
];

export const mockDisputeMessages: Record<string, DisputeMessage[]> = {
  "d001": [
    {
      id: "dm001",
      dispute_id: "d001",
      sender_id: "e003",
      sender_type: "user",
      content: "I'm opening this dispute because the first milestone was due on March 1st and we haven't received any deliverables.",
      created_at: "2026-03-03T10:00:00Z",
    },
    {
      id: "dm002",
      dispute_id: "d001",
      sender_id: "a001",
      sender_type: "agent",
      content: "Thank you for opening this dispute. I've assigned it to myself for review. Please share any communication you've had with the worker.",
      created_at: "2026-03-03T14:30:00Z",
    },
  ],
};
