'use client';

import { FC, useMemo, useState } from 'react';
import { Button } from '../../../components';
import ForgotPasswordForm from './forgotPassword';
import LoginForm from './login';
import SignupForm from './signup';
import { AuthModelState } from '../../../constants/enums';

interface Props {
  activeTab: AuthModelState | false;
  onLogin: (email: string, password: string, remember: boolean) => void;
  onSignup: (email: string, password: string) => void;
  sendResetPasswordLink: (email: string) => void;
  createUserWithGoogle: () => void;
}

const AuthForm: FC<Props> = ({
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
      return <SignupForm changeTab={changeTab} onSignup={onSignup} />;
    }
    if (selectedIndex === 1) {
      return <LoginForm changeTab={changeTab} onLogin={onLogin} />;
    }

    return <ForgotPasswordForm sendResetPasswordLink={sendResetPasswordLink} />;
  }, [selectedIndex]);

  return (
    <div className='max-w-sm'>
      {formToShow}
      {selectedIndex !== 2 && (
        <div className='my-4'>
          <div className='my-2 text-center'>or</div>
          <Button styleClasses='w-full' onClick={createUserWithGoogle}>
            Continue with Google
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
