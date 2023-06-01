import React, { FC } from 'react';
import tid from '../../../constants/testids';
import { Button, Form, SubHeading, TextInput } from '../../../components';

interface Props {
  onSave: (name: string, dob: string, state: string, country: string) => void;
}

const PlayerDataForm: FC<Props> = ({ onSave }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      name: { value: string };
      // dob: { value: string };
      // state: { value: string };
      // country: { value: string };
    };

    const name = target.name.value; // typechecks!
    // const dob = target.dob.value; // typechecks!
    // const state = target.state.value; // typechecks!
    // const country = target.country.value; // typechecks!

    onSave(name, '', '', '');
  };

  return (
    <Form submitHandlerFunc={handleSubmit} testid={tid.formLogin}>
      <div className={'flex flex-col gap-y-4'}>
        <SubHeading>Just to know you</SubHeading>

        <TextInput
          required
          label='Name'
          type={'text'}
          placeholder={'John Doe'}
          name={'name'}
          id={'name'}
        />
        {/* <TextInput
          required
          label='DOB'
          type={'text'}
          placeholder={'DOB'}
          name={'dob'}
          id={'dob'}
        />

        <TextInput
          required
          label='State'
          type={'text'}
          placeholder={'eg. Delhi'}
          name={'state'}
          id={'state'}
        />

        <TextInput
          required
          label='Country'
          type={'text'}
          placeholder={'eg. India'}
          name={'country'}
          id={'country'}
        /> */}

        <Button
          color='accent'
          testid={tid.btnLoginSubmit}
          type='submit'
          solid={true}
        >
          Done
        </Button>
      </div>
    </Form>
  );
};

export default PlayerDataForm;
