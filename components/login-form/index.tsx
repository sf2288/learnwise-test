"use client";

import { LoginAction } from "@/app/login/action";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useCustomRouter } from "@/hooks/use-next-navigation";
import { PAGES } from "@/utils/constants";
import { FormEvent, useState } from "react";
import Label from "../ui/label";

export default function LoginForm() {
  const router = useCustomRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await LoginAction(
        { isAuthenticated: false, message: "" },
        formData
      );

      if (response.isAuthenticated) {
        router.push(PAGES.DASHBOARD.POSTS.url);
      }
      setError(response.message);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex w-full flex-col gap-6">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@domain.com"
            required
            autoFocus
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          aria-disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <Label className="text-destructive">{error}</Label>
      </div>
    </form>
  );
}
