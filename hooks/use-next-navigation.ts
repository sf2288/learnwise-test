import { revalidatePath } from 'next/cache';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';

/**
 * Revalidates a page at the given pathname using Next.js's built-in
 * `revalidatePath` function.
 *
 * @param {string} pathname The path to revalidate.
 */
const handleRevalidatePath = (pathname: string) => {
  if (!pathname) {
    console.error('Pathname is required.');
    return;
  }
  revalidatePath(pathname);
};

/**
 * Returns the `useRouter` hook from `next/navigation`.
 *
 * @returns {UseRouterResult} The result of calling `useRouter`.
 */
function useCustomRouter() {
  return useRouter();
}

/**
 * Returns the `useParams` hook from `next/navigation`.
 *
 * @returns {UseParamsResult} The result of calling `useParams`.
 */
function useCustomParams() {
  return useParams();
}

/**
 * Returns the `useSearchParams` hook from `next/navigation`.
 *
 * @returns {UseSearchParamsResult} The result of calling `useSearchParams`.
 */
function useCustomSearchParams() {
  return useSearchParams();
}

/**
 * Returns the `usePathname` hook from `next/navigation`.
 *
 * @returns {UsePathnameResult} The result of calling `usePathname`.
 */
function useCustomPathname() {
  return usePathname();
}

export {
  handleRevalidatePath,
  useCustomParams,
  useCustomPathname,
  useCustomRouter,
  useCustomSearchParams
};
