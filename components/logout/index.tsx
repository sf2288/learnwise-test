"use client";

import { LogoutAction } from "@/app/login/action";
import { useCustomRouter } from "@/hooks/use-next-navigation";
import { PAGES } from "@/utils/constants";
import { useState } from "react";
import Button from "../ui/button";

const Logout = () => {
  const router = useCustomRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <Button
      type="submit"
      disabled={isLoading}
      aria-disabled={isLoading}
      variant="destructive"
      onClick={() => {
        setLoading(true);
        LogoutAction().then(() => {
          router.push(PAGES.LOGIN.url);
          setLoading(false);
        });
      }}
      loading={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default Logout;
