type Options = RequestInit & { auth?: boolean };

export async function api<T>(url: string, opts: Options = {}): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  };

  if (typeof window !== "undefined" && opts.auth) {
    const t = localStorage.getItem("access_token");
    if (t) headers.Authorization = `Bearer ${t}`;
  }

  const res = await fetch(url, { ...opts, headers, cache: "no-store" });
  if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`);
  return res.json() as Promise<T>;
}