export interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
}

// Define a type for the parameters passed to the fetcher function
interface FetcherParams {
  headers?: Record<string, string>;
  cache?: "default" | "no-store" | "reload" | "force-cache" | "only-if-cached";
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: Record<string, unknown>;
  formData?: FormData | null;
  apiPath: string;
  isLogin?: boolean;
  nextRevalidate?: number | null;
  credentials?: "include" | "same-origin" | "omit";
}
