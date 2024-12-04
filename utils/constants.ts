import { NavItem } from "./common-types";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME as string;

export const CONSTANTS = {
  BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  SITE_NAME: SITE_NAME,
  TOKEN_KEY_NAME: SITE_NAME ? SITE_NAME.toLocaleLowerCase() : "",

  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL as string,

  IMAGE_CDN: process.env.NEXT_PUBLIC_IMAGE_CDN as string,

  PER_PAGE: 10,
  SEARCH_DELAY: 300,
};

export const PAGES = {
  HOME: { label: "Home", url: "/" },
  FOUR_ZERO_FOUR: { label: "404", url: "/404" },
  FIVE_HUNDERED: { label: "500", url: "/500" },
  LOGIN: { label: "Login", url: "/login" },
  DASHBOARD: {
    MAIN: {
      label: "Dashboard",
      url: "/dashboard",
    },
    POSTS: {
      label: "Posts",
      url: "/dashboard/posts",
    },
  },
};

// Define a type for allowed HTTP methods
type HttpMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

// Define an interface for the API route structure
interface CommonApiParams {
  method: HttpMethod;
  apiPath: string;
}

export const API_ROUTES: {
  POSTS: CommonApiParams;
} = {
  POSTS: {
    method: "GET",
    apiPath: "/posts",
  },
};

export const navItems: NavItem[] = [
  {
    label: PAGES.LOGIN.label,
    href: PAGES.LOGIN.url,
  },
  {
    href: PAGES.DASHBOARD.POSTS.url,
    label: PAGES.DASHBOARD.POSTS.label,
  },
];
