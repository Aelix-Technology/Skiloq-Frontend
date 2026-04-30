// src/lib/mock-delay.ts
/**
 * Simulates network delay for mock API calls.
 * Remove this file when switching to real API.
 */
export async function mockDelay(ms: number = 400): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}