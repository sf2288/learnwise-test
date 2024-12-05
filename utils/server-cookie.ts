'use server';
import { cookies } from 'next/headers';

/**
 * Sets a cookie on the server.
 *
 * @param {string} name The name of the cookie.
 * @param {string} value The value of the cookie.
 * @param {Object} options
 * @prop {boolean} options.httpOnly Whether the cookie should be marked as
 *     HTTP-only.
 * @prop {string} options.path The path of the cookie.
 * @prop {Date} [options.expires] The expiration date of the cookie.
 * @prop {number} [options.maxAge] The maximum age of the cookie in seconds.
 * @returns {Promise<void>} A promise that resolves when the cookie has been set.
 */
export const setServerCookie = async (
  name: string,
  value: string,
  options: {
    httpOnly: boolean;
    path: string;
    expires?: Date;
    maxAge?: number;
  }
) => (await cookies()).set(name, value, options);

/**
 * Deletes a cookie on the server.
 *
 * @param {string} name The name of the cookie.
 * @returns {Promise<void>} A promise that resolves when the cookie has been
 *     deleted.
 */
export const deleteServerCookie = async (name: string) =>
  (await cookies()).delete(name);

/**
 * Retrieves a cookie on the server.
 *
 * @param {string} name The name of the cookie.
 * @returns {Promise<string | undefined>} A promise that resolves to the value
 *     of the cookie if it exists, or undefined if it doesn't.
 */
export const getServerCookie = async (name: string) =>
  (await (await cookies()).get(name))?.value;
