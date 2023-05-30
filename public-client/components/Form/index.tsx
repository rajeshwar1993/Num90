import React, { FC } from 'react';
import Button from '../Button';

interface Props {
  children: React.ReactNode;
  submitHandlerFunc: (e: React.FormEvent<HTMLFormElement>) => void;
  testid?: string;
}

const Form: FC<Props> = ({ children, submitHandlerFunc, testid = '' }) => {
  return (
    <form
      data-testid={testid}
      className='block bg-skin-base'
      onSubmit={e => {
        e.preventDefault();
        submitHandlerFunc(e);
      }}
    >
      <>{children}</>
    </form>
  );
};

export default Form;
