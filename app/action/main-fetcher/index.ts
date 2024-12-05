'use server';

import { FetcherParams } from '@/utils/common-types';
import { CONSTANTS } from '@/utils/constants';
import { getServerCookie } from '@/utils/server-cookie';

/**
 * Performs a fetch request to the API.
 *
 * @param {FetcherParams} params An object of parameters to customize the request.
 * @param {Object} [params.headers] Additional headers to be sent with the request.
 * @param {'default' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached'} [params.cache] The cache mode of the request.
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} [params.method] The HTTP method of the request.
 * @param {Object} [params.data] The request body of the request if not a GET request.
 * @param {FormData} [params.formData] The request body as a FormData object if sending files.
 * @param {string} params.apiPath The path of the API endpoint.
 * @param {'include' | 'same-origin' | 'omit'} [params.credentials] The credentials mode of the request.
 * @returns {Promise<{status: number, body: any, headers: Headers, ok: boolean, error?: string}>} A promise resolving to an object with the response status, body, headers, and a boolean indicating if the request was successful.
 */
export async function fetcher({
  headers = {},
  cache,
  method = 'GET',
  data,
  formData = null,
  apiPath,
  credentials = 'include'
}: FetcherParams) {
  const token = await getServerCookie(CONSTANTS.TOKEN_KEY_NAME);

  try {
    // Set Content-Type header if not sending formData
    if (!formData) {
      headers['Content-Type'] = 'application/json';
    }

    const req: RequestInit = {
      method,
      credentials,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...headers
      },
      signal: AbortSignal.timeout(10000), // Set a timeout for the request
      ...(cache && { cache })
    };

    // Build the API URL
    const API_URL = `${CONSTANTS.BASE_API_URL}${apiPath}`;

    // Set request body if not a GET request
    if (method !== 'GET') {
      req.body = formData ? formData : JSON.stringify(data);
    }

    // Perform the fetch request
    const result = await fetch(API_URL, req);

    // Parse JSON response if method is not DELETE
    let body = null;
    if (method !== 'DELETE') {
      body = await result.json();
    }

    return {
      status: result.status,
      body,
      headers: result.headers,
      ok: true
    };
  } catch (e) {
    // Handle different error types
    let errorMessage = 'An unknown error occurred';
    let errorCode = 500;

    if (e instanceof Error) {
      // Network errors (ECONNRESET, timeouts, etc.)
      if (e.message.includes('ECONNRESET')) {
        errorMessage = 'Network error: Connection was reset. Please try again.';
        errorCode = 503; // Service Unavailable
      } else if (e.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again later.';
        errorCode = 408; // Request Timeout
      } else {
        errorMessage = e.message;
      }
    } else if (e instanceof TypeError) {
      errorMessage = 'There was an issue with the request format.';
      errorCode = 400; // Bad Request
    }

    // Log error for debugging
    console.error('Catch: Main fetcher error', e);

    return {
      headers: null,
      status: errorCode,
      body: null,
      ok: false,
      error: errorMessage
    };
  }
}
