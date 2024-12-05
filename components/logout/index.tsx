'use client';

import { LogoutAction } from '@/app/login/action';
import { useCustomRouter } from '@/hooks/use-next-navigation';
import { PAGES } from '@/utils/constants';
import { useState } from 'react';
import { Icons } from '../Icons';
import Label from '../ui/label';

const LogoutIcon = Icons['logout'];

/**
 * A component that logs the user out when clicked and redirects them to
 * the login page.
 *
 * The component renders a label with the text "Logout" and a logout icon.
 * When the user clicks the label, it sets the internal state to `isLoading`
 * to `true` and calls the `LogoutAction` hook which logs the user out and
 * deletes the authentication token cookie. After the action is complete,
 * it sets `isLoading` back to `false` and redirects the user to the login
 * page.
 */
const Logout = () => {
  const router = useCustomRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <Label
      onClick={() => {
        setLoading(true);
        LogoutAction().then(() => {
          router.push(PAGES.LOGIN.url);
          setLoading(false);
        });
      }}
      className="flex cursor-pointer items-center gap-2"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
      <LogoutIcon className="size-4" />
    </Label>
  );
};

export default Logout;
