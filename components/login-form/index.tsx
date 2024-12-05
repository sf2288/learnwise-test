'use client';

import { LoginAction } from '@/app/login/action';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useCustomRouter } from '@/hooks/use-next-navigation';
import { PAGES } from '@/utils/constants';
import { FormEvent, useState } from 'react';
import Label from '../ui/label';

/**
 * LoginForm
 *
 * A component that renders a login form and handles the login process via the
 * `LoginAction` hook. If the login is successful, it redirects the user to the
 * dashboard page. If the login fails, it displays an error message below the
 * form.
 *
 * @returns A React component that renders a login form.
 */
export default function LoginForm() {
  const router = useCustomRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the form submission of the login form. Prevents the default form
   * submission behavior. Sets the internal state to `isLoading` to `true` and
   * `error` to `null`. Calls the `LoginAction` hook, passing the form data as
   * an argument. If the action is successful and the user is authenticated, it
   * redirects the user to the dashboard page. If the action fails, it sets the
   * `error` state to the error message returned by the hook. If an unexpected
   * error occurs, it logs the error to the console and sets `isLoading` to
   * `false`.
   *
   * @param {FormEvent<HTMLFormElement>} event The form submission event.
   */
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await LoginAction(
        { isAuthenticated: false, message: '' },
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
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        {error ? <Label className="text-destructive">{error}</Label> : null}
      </div>
    </form>
  );
}
