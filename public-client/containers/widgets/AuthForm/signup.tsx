import React, { FC } from 'react';
// import { handleRuntimeErrors } from '../../../core/commonHandlers';
import tid from '../../../constants/testids';
import {
  Button,
  Checkbox,
  Form,
  SubHeading,
  TextInput
} from '../../../components';

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
      <div className={'flex flex-col gap-y-4'}>
        <SubHeading>Signup</SubHeading>
        <TextInput
          required
          label='Email address'
          placeholder={'E-mail'}
          type={'email'}
          name={'email'}
          id={'email'}
          testid={tid.inpLoginEmail}
        />
        <TextInput
          required
          label='Password'
          placeholder={'Passoword'}
          type={'password'}
          name={'password'}
          id={'password'}
          testid={tid.inpLoginPassword}
        />
        <TextInput
          type={'password'}
          label='Confirm password'
          placeholder={'Confirm password'}
          name={'confirmPass'}
          id={'confirmPass'}
          testid={tid.inpLoginConfirmPassword}
        />
        <Button type='submit' color='accent' testid={tid.btnSignupSubmit}>
          Signup
        </Button>
        <div className='text-center'>
          <span>Already a member? </span>
          <Button look='link' onClick={changeTab.bind(null, 1)}>
            Login
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;
