import CustomLink from '@/components/custom-link';
import Button from '@/components/ui/button';
import { PAGES } from '@/utils/constants';

/**
 * Renders a 404 Not Found page with a message indicating the page is not available.
 * Displays a large "404" text, a message stating the page is not found,
 * and provides a link to navigate back to the home page.
 */
export default function NotFound() {
  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="my-2 text-2xl font-bold">Page not found!</h2>
      <p>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <CustomLink href={PAGES.DASHBOARD.POSTS.url}>
          <Button> Back to Home</Button>
        </CustomLink>
      </div>
    </div>
  );
}
