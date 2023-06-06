'use client';

import { FC, useMemo, useState } from 'react';
import ForgotPasswordForm from './forgotPassword';
import LoginForm from './login';
import SignupForm from './signup';
import { AuthModelState } from '../../../constants/enums';
import { Button } from '@/components/ui/button';

interface Props {
  loading: boolean;
  activeTab: AuthModelState | false;
  onLogin: (email: string, password: string, remember: boolean) => void;
  onSignup: (email: string, password: string) => void;
  sendResetPasswordLink: (email: string) => void;
  createUserWithGoogle: () => void;
}

const AuthForm: FC<Props> = ({
  loading,
  activeTab,
  onLogin,
  onSignup,
  sendResetPasswordLink,
  createUserWithGoogle
}) => {
  const selectedTabIndex = (activeTab: AuthModelState | false) => {
    switch (activeTab) {
      case AuthModelState.SIGNUP:
        return 0;

      case AuthModelState.LOGIN:
        return 1;
      default:
        return 2;
    }
  };

  const [selectedIndex, setSelectedIndex] = useState<0 | 1 | 2>(
    selectedTabIndex(activeTab)
  );

  const changeTab = (index: 0 | 1 | 2) => {
    setSelectedIndex(index);
  };

  const formToShow = useMemo(() => {
    if (selectedIndex === 0) {
      return (
        <SignupForm
          loading={loading}
          changeTab={changeTab}
          onSignup={onSignup}
        />
      );
    }
    if (selectedIndex === 1) {
      return (
        <LoginForm loading={loading} changeTab={changeTab} onLogin={onLogin} />
      );
    }

    return <ForgotPasswordForm sendResetPasswordLink={sendResetPasswordLink} />;
  }, [selectedIndex, loading]);

  return (
    <div className='text-left max-w-sm'>
      {formToShow}
      {selectedIndex !== 2 && (
        <div className='my-4'>
          <div className='relative mb-4'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          <Button onClick={createUserWithGoogle} className='w-full'>
            Google
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
