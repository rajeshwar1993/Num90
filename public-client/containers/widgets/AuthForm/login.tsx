import React, { FC } from 'react';
import tid from '../../../constants/testids';
import {
  Button,
  Checkbox,
  Form,
  SubHeading,
  TextInput
} from '../../../components';

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
    <Form submitHandlerFunc={handleSubmit} testid={tid.formLogin}>
      <div className={'flex flex-col gap-y-4'}>
        <SubHeading>Login</SubHeading>

        <TextInput
          required
          label='Email address'
          type={'email'}
          placeholder={'E-mail'}
          name={'email'}
          id={'email'}
          testid={tid.inpLoginEmail}
        />
        <TextInput
          required
          label='Password'
          type={'password'}
          placeholder={'Password'}
          name={'password'}
          id={'password'}
          testid={tid.inpLoginPassword}
        />
        <div className={'flex justify-between items-center'}>
          <Checkbox
            id='remember'
            label='Remember me'
            name='remember'
            defaultValue={true}
          />
          <Button look='link' onClick={changeTab.bind(null, 2)}>
            forgot password?
          </Button>
        </div>
        <Button color='accent' testid={tid.btnLoginSubmit} type='submit'>
          Login
        </Button>
        <div className='text-center'>
          <span>Not a member? </span>
          <Button look='link' onClick={changeTab.bind(null, 0)}>
            Signup
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
