'use client';

import { LogoutAction } from '@/app/login/action';
import { useCustomRouter } from '@/hooks/use-next-navigation';
import { PAGES } from '@/utils/constants';
import { useState } from 'react';
import { Icons } from '../Icons';
import Label from '../ui/label';

const LogoutIcon = Icons['logout'];

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
