import { UserModel } from '../../../data_models';
import { FC } from 'react';
import { Button, Para, SubHeading } from '../../../components';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import AvatarComp from '../Avatar';

interface Props {
  user: UserModel;
}

const UserProfile: FC<Props> = ({ user }) => {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-center gap-x-36 gap-y-7'>
      <div className='max-w-xs min-w-[320px] border border-skin-primary rounded-lg p-4 flex flex-col items-center justify-center gap-y-4'>
        <AvatarComp
          image={user.profileImg ?? undefined}
          name={user.name}
          isOnProfileScreen={true}
        />
        <SubHeading>{user.name || '(No Name)'}</SubHeading>
        <Para>
          <div className='flex gap-2 items-center'>
            {user.email || '(No Email)'}{' '}
            {user.verified && (
              <CheckCircledIcon
                className='text-green-500'
                height={20}
                width={20}
              />
            )}
          </div>
        </Para>
        <Para>
          <div className='flex gap-2 items-center'>
            {user.phoneNumber || '(No Phone Number)'}{' '}
            {user.phoneNumber && (
              <CheckCircledIcon
                className='text-green-500'
                height={20}
                width={20}
              />
            )}
          </div>
        </Para>
        <Para>
          <div className='flex gap-2 items-center'>
            {user.dob || '(No DOB)'}
          </div>
        </Para>
        {user.state && (
          <Para>
            <div className='flex gap-2 items-center'>{user.state}</div>
          </Para>
        )}
        {user.state && (
          <Para>
            <div className='flex gap-2 items-center'>{user.country}</div>
          </Para>
        )}
        <Button solid={true} color='accent'>
          Edit
        </Button>
      </div>
      <div className='max-w-xs min-w-[320px]  border border-skin-primary rounded-lg p-4 flex flex-col items-center justify-center gap-y-4'>
        <SubHeading>Ticket Balance</SubHeading>
        <div className='text-9xl'>45</div>
        <Para>Contact us to buy more tickets</Para>
      </div>
    </div>
  );
};

export default UserProfile;
