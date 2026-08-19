import { normalizeFetchUrl } from "@/utils/normalizeFetchUrl"

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1"

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let normalizedUrl = normalizeFetchUrl(BASE_URL, path)

  const res = await fetch(normalizedUrl, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  })

  const promise = res.json() as Promise<T>
  return promise
}

export const client = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  delete: <T>(path: string) =>
    request<T>(path, {
      method: "DELETE",
    }),
}
