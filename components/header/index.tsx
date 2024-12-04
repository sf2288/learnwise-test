import { CONSTANTS } from "@/utils/constants";
import { getServerCookie } from "@/utils/server-cookie";
import Container from "../container";
import CustomLink from "../custom-link";
import LogoIcon from "../icon/logo";
import Logout from "../logout";

export default async function Header() {
  const isAuth = await getServerCookie(CONSTANTS.TOKEN_KEY_NAME);

  if (!isAuth) return null;

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
      <Container>
        <div className="p-4 flex justify-between items-center w-full">
          <CustomLink
            href="/"
            className="text-2xl font-bold flex items-center gap-2"
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
