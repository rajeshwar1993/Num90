import React, { FC } from 'react';
import tid from '../../../constants/testids';
import {
  Button,
  Checkbox,
  Form,
  SubHeading,
  TextInput,
  Subtext
} from '../../../components';

interface Props {
  sendResetPasswordLink: (email: string) => void;
}

const ForgotPasswordForm: FC<Props> = ({ sendResetPasswordLink }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    const email = target.email.value; // typechecks!
    sendResetPasswordLink(email);
  };

  return (
    <Form submitHandlerFunc={handleSubmit} testid={tid.formLogin}>
      <div className={'flex flex-col gap-y-4 max-w-md'}>
        <SubHeading>Reset Passowrd</SubHeading>
        <Subtext>
          We will send you a reset link on your registered email.
        </Subtext>
        <TextInput
          required={true}
          placeholder={'E-mail'}
          type={'email'}
          name={'email'}
          id={'email'}
          label={'Registered E-mail'}
          testid={tid.inpForgotPassowrdEmail}
          description={'E-mail where you will recieve the reset password link.'}
        />

        <Button color='error' testid={tid.btnUserDeleteSubmit} type='submit'>
          Send Password Reset Link
        </Button>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;
