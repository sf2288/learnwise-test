import { CONSTANTS, PAGES } from '@/utils/constants';
import { getServerCookie } from '@/utils/server-cookie';
import Container from '../container';
import CustomLink from '../custom-link';
import LogoIcon from '../icon/logo';
import Logout from '../logout';

/**
 * The site header, which displays the site name and a logout button when the
 * user is authenticated.
 *
 * If the user is not authenticated, the header is not rendered.
 *
 * @returns The header component, or null if the user is not authenticated.
 */
export default async function Header() {
  const isAuth = await getServerCookie(CONSTANTS.TOKEN_KEY_NAME);

  if (!isAuth) return null;

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
      <Container>
        <div className="flex w-full items-center justify-between p-4">
          <CustomLink
            href={PAGES.DASHBOARD.POSTS.url}
            className="flex items-center gap-2 text-base font-bold sm:text-xl md:text-2xl"
          >
            <LogoIcon />
            {CONSTANTS.SITE_NAME}
          </CustomLink>
          <Logout />
        </div>
      </Container>
    </header>
  );
}
