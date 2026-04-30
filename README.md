# Aelix-Frontend
Skills-first hiring platform with verification, task-based matching, and global job access

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand (global state)
- TanStack React Query (server state)
- 

##  Project Structure
PLEASE FOLLOW THE FOLDER STRUCTURE IN THE TECHNICAL ACHITECTURE BLUEPRINT; Ref: 03, page 7


## Architecture Rules (STRICT)

1. `app/` is for routing only  
   - No business logic  
   - Keep pages thin  

2. All business logic must live in `features/`  
   - Each feature is self-contained  
   - Includes components, hooks, services  

3. `components/` is for reusable UI only  
   - Buttons, inputs, layouts  
   - No feature-specific logic  

4. Feature-first development  
   - Build systems, not pages  

---

## Routing Overview

### Public
- `/`
- `/login`
- `/signup`
- `/how-it-works`

### Worker
- `/worker/dashboard`
- `/worker/opportunities`
- `/worker/bookings`
- `/worker/messages`
- `/worker/wallet`
- `/worker/profile`
- `/worker/verification`

### Employer
- `/employer/dashboard`
- `/employer/jobs`
- `/employer/find-talent`
- `/employer/messages`
- `/employer/payments`

### Admin
- `/admin/dashboard`
- `/admin/verification-queue`
- `/admin/users`

### Agent
- `/agent/dashboard`
- `/agent/tasks`

---

## State Management

### Global State (Zustand)
- authStore  
- uiStore  
- notificationStore  

### Server State (React Query)
- worker profiles  
- jobs  
- messages  
- wallet  

  
