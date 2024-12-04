import { revalidatePath } from "next/cache";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

/**
 * Revalidates a page at the given pathname using Next.js's built-in
 * `revalidatePath` function.
 *
 * @param {string} pathname The path to revalidate.
 */
const handleRevalidatePath = (pathname: string) => {
  if (!pathname) {
    console.error("Pathname is required.");
    return;
  }
  revalidatePath(pathname);
};

function useCustomRouter() {
  return useRouter();
}

function useCustomParams() {
  return useParams();
}

function useCustomSearchParams() {
  return useSearchParams();
}

function useCustomPathname() {
  return usePathname();
}

export {
  handleRevalidatePath,
  useCustomParams,
  useCustomPathname,
  useCustomRouter,
  useCustomSearchParams,
};
