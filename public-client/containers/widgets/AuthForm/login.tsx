import React, { FC } from 'react';
import tid from '../../../constants/testids';
import { Form } from '../../../components';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface Props {
  onLogin: (email: string, password: string, remember: boolean) => void;
  changeTab: (index: 0 | 1 | 2) => void;
}

const LoginForm: FC<Props> = ({ onLogin, changeTab }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      remember: { checked: boolean };
    };

    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    const remember = target.remember.checked; // typechecks!

    onLogin(email, password, remember);
  };

  return (
    <div className='text-left'>
      <Form submitHandlerFunc={handleSubmit} testid={tid.formLogin}>
        <CardHeader className='space-y-1 pl-0'>
          <CardTitle className='text-2xl'>Login</CardTitle>
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

          <div className={'flex items-center'}>
            <div className='flex items-center space-x-2'>
              <Checkbox id='remember' />
              <label
                htmlFor='remember'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                remember me
              </label>
            </div>
            <Separator orientation='vertical' className='ml-4' />
            <Button
              variant='link'
              size={'sm'}
              onClick={changeTab.bind(null, 2)}
            >
              forgot password?
            </Button>
          </div>
          <Button color='accent' testid={tid.btnLoginSubmit} type='submit'>
            Login
          </Button>
          <div className='text-center'>
            <small className='text-sm font-normal leading-none'>
              not a member?
            </small>

            <Button variant='link' onClick={changeTab.bind(null, 0)}>
              Signup
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
