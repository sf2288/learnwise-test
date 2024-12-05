'use client';

import { LoginAction } from '@/app/login/action';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useCustomRouter } from '@/hooks/use-next-navigation';
import { PAGES } from '@/utils/constants';
import { FormEvent, useState } from 'react';
import Label from '../ui/label';
import { useToast } from '../toast-context';

/**
 * LoginForm
 *
 * A login form component that handles submission of the login form to
 * the LoginAction hook and redirects to the dashboard page if successful.
 *
 * @returns A form element with email and password inputs and a submit button
 */
export default function LoginForm() {
  const router = useCustomRouter();
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await LoginAction(
        { isAuthenticated: false, message: '' },
        formData
      );

      if (response.isAuthenticated) {
        router.push(PAGES.DASHBOARD.POSTS.url);
      }
      addToast({
        type: response.error ? 'error' : 'success',
        title: 'Alert',
        message: response.message
      });
      if (response.error) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      addToast({
        type: 'error',
        title: 'Alert',
        message: error as string
      });
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
      </div>
    </form>
  );
}
