import React, { FC, useState } from 'react';
import tid from '../../../constants/testids';
import { Form } from '../../../components';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/DatePicker';

interface Props {
  onSave: (name: string, dob: string, state: string, country: string) => void;
}

const PlayerDataForm: FC<Props> = ({ onSave }) => {
  const [dob, setDob] = useState<Date>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      name: { value: string };
      // dob: { value: string };
      // state: { value: string };
      // country: { value: string };
    };

    const name = target.name.value; // typechecks!
    const bday = dob ? dob.toISOString() : null; // typechecks!
    if (!bday) return;
    onSave(name, bday, '', '');
  };

  return (
    <Form submitHandlerFunc={handleSubmit} testid={tid.formLogin}>
      <div className={'grid gap-4'}>
        <CardHeader className='space-y-1 pl-0'>
          <CardTitle className='text-2xl'>Just to know you</CardTitle>
        </CardHeader>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            required
            type={'text'}
            placeholder={'John Doe'}
            name={'name'}
            id={'name'}
          />
        </div>

        <DatePicker date={dob} setDate={(day, selectedDay) => setDob(day)} />

        <Button testid={tid.btnLoginSubmit} type='submit'>
          {`Let's play`}
        </Button>
      </div>
    </Form>
  );
};

export default PlayerDataForm;
