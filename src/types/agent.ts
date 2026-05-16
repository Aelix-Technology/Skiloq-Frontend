// src/types/agent.ts
export interface AgentTask {
  id: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  type: "identity_verification" | "workspace_check" | "skill_demo";
  status: "assigned" | "accepted" | "in_progress" | "completed";
  location: {
    address: string;
    district: string;
    lat: number;
    lng: number;
  };
  scheduledAt: string;
  deadlineAt: string;
  notes: string;
  requiredEvidence: string[];
  submittedEvidence: Array<{
    type: "photo" | "video";
    url: string;
    timestamp: string;
    gpsCoordinates?: { lat: number; lng: number };
  }>;
}

export interface AgentStats {
  totalAssigned: number;
  completedToday: number;
  pendingReview: number;
  acceptanceRate: number;
  averageCompletionTime: string;
}
