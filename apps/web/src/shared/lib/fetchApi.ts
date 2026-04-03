type FetchApiOptions = {
  path: string;
  searchParams?: Record<string, string>;
};

export async function fetchApi<T>({
  path,
  searchParams,
}: FetchApiOptions): Promise<T | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
  }

  const url = new URL(path, baseUrl);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      cache: "no-store",
    });
  } catch (error) {
    console.error("[fetchApi] network error:", url.toString(), error);
    return null;
  }

  const text = await response.text();

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    console.error("[fetchApi] request failed:", {
      url: url.toString(),
      status: response.status,
      body: text,
    });
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("[fetchApi] json parse failed:", {
      url: url.toString(),
      body: text,
      error,
    });
    return null;
  }
}
