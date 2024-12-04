'use server';
import { cookies } from 'next/headers';

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

export const deleteServerCookie = async (name: string) =>
  (await cookies()).delete(name);

export const getServerCookie = async (name: string) =>
  (await (await cookies()).get(name))?.value;
