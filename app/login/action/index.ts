'use server';

import { CONSTANTS } from '@/utils/constants';
import { deleteServerCookie, setServerCookie } from '@/utils/server-cookie';
interface ICommon {
  status?: number;
  body?: { error?: string };
}
interface LoginState extends ICommon {
  isAuthenticated: boolean;
  message: string;
  error?: boolean;
}

/**
 * Handles a login request by validating the provided email and password against the ADMIN_EMAIL and ADMIN_PASSWORD constants.
 * If the credentials are valid, sets a server-side cookie with the name specified by TOKEN_KEY_NAME and a value of 'true'.
 * Returns a Promise that resolves with an object containing an isAuthenticated boolean property and a message property.
 * If the credentials are invalid, the message property will contain the string 'Invalid Credentials'.
 * If an unexpected error occurs, the message property will contain the string 'Failed to login' and the status property will be set to 500.
 * @param state The current state of the login process, which can be either a LoginState object or an object with a status property and a body object with an error property.
 * @param data The FormData object containing the email and password from the login form.
 * @returns A Promise that resolves with an object containing an isAuthenticated boolean property and a message property.
 */
export const LoginAction = async (
  state:
    | LoginState
    | { status: number; body: { error: boolean; message: string } },
  data: FormData
): Promise<LoginState> => {
  try {
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const isAuthenticated =
      email === CONSTANTS.ADMIN_EMAIL && password === CONSTANTS.ADMIN_PASSWORD;

    if (isAuthenticated) {
      await setServerCookie(CONSTANTS.TOKEN_KEY_NAME, 'true', {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + 86400 * 1000)
      });
    }

    return {
      isAuthenticated,
      message: !isAuthenticated ? 'Invalid Credentials' : 'Login successful!',
      error: !isAuthenticated
    };
  } catch (error) {
    console.log('Unexpected error in LoginAction:', error);
    return {
      isAuthenticated: false,
      error: true,
      message: 'Failed to login',
      status: 500,
      body: { error: 'An unexpected error occurred' }
    };
  }
};

/**
 * Logs out the user by deleting the authentication token cookie.
 *
 * This function attempts to remove the server-side cookie associated with
 * the user's authentication session. If an error occurs during this process,
 * it catches the exception, logs the error, and returns a response object
 * indicating a server error status.
 *
 * @returns {Promise<{ status: number; body: { error: string } } | void>}
 *          A promise that resolves with an error response object if an
 *          exception is caught, otherwise nothing is returned.
 */
export const LogoutAction = async () => {
  try {
    await deleteServerCookie(CONSTANTS.TOKEN_KEY_NAME);
  } catch (e: unknown) {
    console.error('Unexpected error in logoutAction catch', e);
    return {
      status: 500,
      body: { error: 'An unexpected error occurred' }
    };
  }
};
