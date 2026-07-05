const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8034';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export const apiCall = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { timeout = 5000, ...fetchOptions } = options;
  const url = `${API_URL}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
