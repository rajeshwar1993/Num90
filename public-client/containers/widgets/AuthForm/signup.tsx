import React, { FC } from 'react';
// import { handleRuntimeErrors } from '../../../core/commonHandlers';
import tid from '../../../constants/testids';
import { Form } from '../../../components';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Props {
  onSignup: (email: string, password: string) => void;
  changeTab: (index: 0 | 1 | 2) => void;
}

const SignupForm: FC<Props> = ({ onSignup, changeTab }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      confirmPass: { value: string };
    };

    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    const confirmPass = target.confirmPass.value; // typechecks!

    if (password !== confirmPass) {
      //   handleRuntimeErrors(
      //     'Password Missmatch',
      //     'auth/password-missmatch',
      //     true,
      //     false
      //   );
      return;
    }

    onSignup(email, password);
  };

  return (
    <Form submitHandlerFunc={handleSubmit}>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Create account</CardTitle>
      </CardHeader>
      <div className={'grid gap-4'}>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email address *</Label>
          <Input
            required
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            id={'email'}
            testid={tid.inpLoginEmail}
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            required
            type={'password'}
            placeholder={'Password'}
            name={'password'}
            id={'password'}
            testid={tid.inpLoginPassword}
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='confirmPass'>Confirm Password</Label>
          <Input
            required
            type={'password'}
            placeholder={'Confirm password'}
            name={'confirmPass'}
            id={'confirmPass'}
            testid={tid.inpLoginPassword}
          />
        </div>

        <Button type='submit' testid={tid.btnSignupSubmit}>
          Signup
        </Button>
        <div className='text-center'>
          <small className='text-sm font-normal leading-none'>
            have an account?
          </small>
          <Button variant='link' onClick={changeTab.bind(null, 1)}>
            Login
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;
