// src/lib/mock-agent.ts
import type { AgentTask, AgentStats } from "@/types/agent";

export const mockAgentStats: AgentStats = {
  totalAssigned: 12,
  completedToday: 3,
  pendingReview: 5,
  acceptanceRate: 94,
  averageCompletionTime: "4.2 hours",
};

export const mockAgentTasks: AgentTask[] = [
  {
    id: "task-001",
    workerId: "w002",
    workerName: "Kwame Boateng",
    workerPhone: "024****890",
    type: "workspace_check",
    status: "assigned",
    location: {
      address: "Plot 12, Industrial Area",
      district: "Kumasi Metropolitan",
      lat: 6.6885,
      lng: -1.6244,
    },
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    notes: "Verify workshop has proper electrical testing equipment. Take photos of workspace and tools.",
    requiredEvidence: ["photo", "photo", "photo"],
    submittedEvidence: [],
  },
  {
    id: "task-002",
    workerId: "w006",
    workerName: "Kojo Essel",
    workerPhone: "027****789",
    type: "identity_verification",
    status: "accepted",
    location: {
      address: "22 Oxford Street, Osu",
      district: "Accra Metropolitan",
      lat: 5.6037,
      lng: -0.1870,
    },
    scheduledAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    notes: "Verify Ghana Card in person. Confirm the photo matches the individual.",
    requiredEvidence: ["photo", "photo"],
    submittedEvidence: [],
  },
  {
    id: "task-003",
    workerId: "w004",
    workerName: "Yaw Takyi",
    workerPhone: "055****456",
    type: "skill_demo",
    status: "in_progress",
    location: {
      address: "Block C, Faanofa Street",
      district: "Adenta Municipal",
      lat: 5.7095,
      lng: -0.1667,
    },
    scheduledAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    notes: "Watch the plumber demonstrate pipe fitting. Record a short video of the demonstration.",
    requiredEvidence: ["video", "photo"],
    submittedEvidence: [
      {
        type: "photo",
        url: "/assets/images/hired.png",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        gpsCoordinates: { lat: 5.7095, lng: -0.1667 },
      },
    ],
  },
  {
    id: "task-004",
    workerId: "w005",
    workerName: "Abena Dapaah",
    workerPhone: "020****123",
    type: "workspace_check",
    status: "completed",
    location: {
      address: "15 Market Circle",
      district: "Cape Coast Metropolitan",
      lat: 5.1053,
      lng: -1.2466,
    },
    scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    deadlineAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    notes: "Verify tailoring workshop. Check sewing machines and sample work.",
    requiredEvidence: ["photo", "photo"],
    submittedEvidence: [
      {
        type: "photo",
        url: "/assets/images/skill.png",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        gpsCoordinates: { lat: 5.1053, lng: -1.2466 },
      },
      {
        type: "photo",
        url: "/assets/images/passport.jpg",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        gpsCoordinates: { lat: 5.1053, lng: -1.2466 },
      },
    ],
  },
];