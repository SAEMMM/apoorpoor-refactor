import "server-only";

type FetchApiOptions = {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  searchParams?: Record<string, string>;
  body?: unknown;
};

function getBaseUrl() {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined.");
  }

  return baseUrl;
}

export async function fetchApi<T>({
  path,
  method = "GET",
  searchParams,
  body,
}: FetchApiOptions): Promise<T | null> {
  const url = new URL(path, getBaseUrl());

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value);
    }
  }

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      method,
      cache: "no-store",
      ...(body !== undefined && {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    });
  } catch (error) {
    const cause = (error as { cause?: { code?: string } })?.cause;
    const isConnRefused = cause?.code === "ECONNREFUSED";

    if (!isConnRefused) {
      console.error("[fetchApi] network error", {
        url: url.toString(),
        error,
      });
    }

    return null;
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[fetchApi] request failed", {
      url: url.toString(),
      status: response.status,
      body,
    });
    return null;
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    console.error("[fetchApi] invalid json response", {
      url: url.toString(),
      error,
    });
    return null;
  }
}