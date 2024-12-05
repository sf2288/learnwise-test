import { PAGES } from '@/utils/constants';
import { redirect } from 'next/navigation';

/**
 * Redirects to the posts page.
 *
 * This is the root route, but we don't want to show any content here, so we
 * immediately redirect to the posts page.
 */
export default function Home() {
  redirect(PAGES.DASHBOARD.POSTS.url);
  return <></>;
}
