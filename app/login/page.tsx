import LogoIcon from '@/components/icon/logo';
import LoginForm from '@/components/login-form';
import Label from '@/components/ui/label';
import { CONSTANTS } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${CONSTANTS.SITE_NAME} Login`,
  description: `${CONSTANTS.SITE_NAME} Login page.`
};

/**
 * LoginPage
 *
 * This component renders the login page.
 */
export default function LoginPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full items-center justify-center bg-primary p-10 text-white lg:flex">
        <h1 className="flex items-center gap-2 text-4xl font-medium">
          <LogoIcon className="size-8" />
          {CONSTANTS.SITE_NAME}
        </h1>
      </div>
      <div className="mt-6 flex h-full flex-col items-center p-4 lg:mt-0 lg:flex-row lg:p-8">
        <h1 className="flex items-center justify-center gap-2 text-xl font-medium lg:hidden">
          <LogoIcon className="stroke-primary" />
          {CONSTANTS.SITE_NAME}
        </h1>{' '}
        <div className="mx-auto flex size-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-xl font-semibold tracking-tight lg:text-2xl">
              Login
            </h2>
            <Label className="text-sm text-muted-foreground">
              Enter your login details below
            </Label>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
