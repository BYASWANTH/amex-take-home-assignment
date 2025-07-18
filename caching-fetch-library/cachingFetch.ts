import { useEffect, useState } from 'react';
type UseCachingFetch = (url: string) => {
  isLoading: boolean;
  data: unknown;
  error: Error | null;
};

// Simple in-memory cache shared between all functions
const globalCache = new Map<string, unknown>();

// -- Hook: useCachingFetch ----------------------------------------------------

export const useCachingFetch: UseCachingFetch = (url) => {
  const [data, setData] = useState<unknown>(() => globalCache.get(url) ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(!globalCache.has(url));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (globalCache.has(url)) return; // avoid re-fetch

    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
        return res.json();
      })
      .then((json) => {
        globalCache.set(url, json);
        setData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [url]);

  return { data, isLoading, error };
};

// -- Function: preloadCachingFetch --------------------------------------------

export const preloadCachingFetch = async (url: string): Promise<void> => {
  if (globalCache.has(url)) return;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
  const json = await res.json();
  globalCache.set(url, json);
};

// -- Function: serializeCache -------------------------------------------------

export const serializeCache = (): string => {
  return JSON.stringify(Array.from(globalCache.entries()));
};

// -- Function: initializeCache ------------------------------------------------

export const initializeCache = (serializedCache: string): void => {
  try {
    const parsed = JSON.parse(serializedCache);
    for (const [key, value] of parsed) {
      globalCache.set(key, value);
    }
  } catch {
    // ignore errors
  }
};

// -- Function: wipeCache ------------------------------------------------------

export const wipeCache = (): void => {
  globalCache.clear();
};
