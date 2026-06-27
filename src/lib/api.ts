// src/lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const API_VERSION = "v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    public detail: string
  ) {
    super(detail);
    this.name = "ApiError";
  }
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

async function refreshAccessToken(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/${API_VERSION}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    accessToken = null;
    throw new ApiError(401, "AUTH_EXPIRED", "Session expired. Please log in again.");
  }

  const data = await res.json();
  accessToken = data.accessToken;
  return data.accessToken;
}

export async function api<T>(
  path: string,
  options?: RequestInit & { skipAuth?: boolean }
): Promise<T> {
  const url = `${API_BASE}/api/${API_VERSION}${path}`;

  const headers: Record<string, string> = {};

  // Only set Content-Type for non-FormData requests
  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Merge custom headers
  if (options?.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  // Attach auth token
  if (!options?.skipAuth && accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  // Auto-refresh token on 401
  if (res.status === 401 && !options?.skipAuth) {
    try {
      const newToken = await refreshAccessToken();
      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(url, { ...options, headers, credentials: "include" });
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(401, "AUTH_EXPIRED", "Session expired. Please log in again.");
    }
  }

  if (!res.ok) {
    let body: any = {};
    try {
      body = await res.json();
      console.log("API error response body:", body);
    } catch {
      // Response is not JSON
    }
    // Try to extract error message from various possible locations
    let errorMessage = `Request failed with status ${res.status}`;
    if (body.message) {
      errorMessage = body.message;
    } else if (body.data?.message) {
      errorMessage = body.data.message;
    } else if (body.detail) {
      errorMessage = body.detail;
    } else if (typeof body === "string") {
      errorMessage = body;
    }
    throw new ApiError(
      res.status,
      body.code || "UNKNOWN_ERROR",
      errorMessage
    );
  }

  // Handle empty responses (204 No Content)
  if (res.status === 204) return undefined as T;

  return res.json();
}

// Convenience methods
export const apiClient = {
  get: <T>(path: string, options?: RequestInit) =>
    api<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: RequestInit) =>
    api<T>(path, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: <T>(path: string, body?: unknown, options?: RequestInit) =>
    api<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(path: string, body?: unknown, options?: RequestInit) =>
    api<T>(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    api<T>(path, { ...options, method: "DELETE" }),

  upload: <T>(path: string, formData: FormData, options?: RequestInit) =>
    api<T>(path, {
      ...options,
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for multipart
    }),
};
