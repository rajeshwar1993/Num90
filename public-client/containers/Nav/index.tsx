'use client';

import Link from 'next/link';
import { FC, Fragment, useMemo } from 'react';
import { Button, ModalDialog, Toast } from '../../components';
import useAuth from '../../app/AuthProvider';
import { AuthModelState } from '../../constants/enums';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { Image, NavItem } from '../../data_models';
import AvatarComp from '../widgets/Avatar';
import { Menu, Transition } from '@headlessui/react';
import AuthForm from '../widgets/AuthForm';
import Routes from '../../constants/routes';
import CustImage from '../widgets/CustImage';
import navLogo from '../../public/images/HWL1.png';

const navItems: NavItem[] = [
  {
    title: 'Get Started',
    href: '/',
    isAuthReq: false
  },
  {
    title: 'About',
    href: '/',
    isAuthReq: false
  },
  {
    title: 'Join Game',
    href: Routes.joinGame,
    isAuthReq: false
  },
  {
    title: 'My Games',
    href: Routes.myGames,
    isAuthReq: true
  }
];
interface NavItemProps {
  title: string;
  href: string;
}

const MobileMenu: FC<{ items: NavItemProps[] }> = ({ items }) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button
          className={'flex gap-x-1 items-center text-lg font-medium'}
        >
          Menu
          <CaretDownIcon
            className='text-skin-primary relative top-[1px]'
            aria-hidden
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={clsx(
            'absolute',
            'left-[-40px]',
            'mt-2',
            'w-36',
            'origin-top-right',
            'divide-y',
            'divide-gray-100',
            'rounded-md',
            'bg-skin-base',
            'shadow-lg',
            'ring-1',
            'ring-black',
            'ring-opacity-5 focus:outline-none'
          )}
        >
          {items.map(item => (
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <Link href={item.href}>
                    <div
                      className={clsx(
                        active
                          ? 'bg-skin-accent text-skin-inverted'
                          : 'text-skin-primary',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      )}
                    >
                      {item.title}
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface UserAvatarProps {
  userData: {
    image?: Image;
    name?: string;
  };
  signout: () => void;
}

const UserAvatar: FC<UserAvatarProps> = ({ userData = {}, signout }) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button>
          <AvatarComp image={userData.image} name={userData.name} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={clsx(
            'absolute',
            'right-0',
            'mt-2',
            'w-56',
            'origin-top-right',
            'divide-y',
            'divide-gray-100',
            'rounded-md',
            'bg-skin-base',
            'shadow-lg',
            'ring-1',
            'ring-black',
            'ring-opacity-5 focus:outline-none'
          )}
        >
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <Link href={Routes.userProfile}>
                  <div
                    className={clsx(
                      active
                        ? 'bg-skin-accent text-skin-inverted'
                        : 'text-skin-primary',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    )}
                  >
                    Profile
                  </div>
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={signout}
                  className={clsx(
                    active
                      ? 'bg-skin-accent text-skin-inverted'
                      : 'text-skin-primary',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                  )}
                >
                  Signout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface Props {
  // navItems: NavItem[];
}

const Nav: FC<Props> = ({}) => {
  const { user, updateAuthModalVisibility, signout, sendVerificationEmail } =
    useAuth();

  const filteredListItems = useMemo(() => {
    const isAuth = !!user;
    const listItems = [];

    navItems.forEach(navItem => {
      if (!navItem.isAuthReq || (isAuth && navItem.isAuthReq)) {
        listItems.push(navItem);
      }
    });
    return listItems;
  }, [user, navItems]);

  return (
    <>
      <div>
        <NavigationMenu.Root className='relative z-[1] flex justify-between items-center'>
          {/* logo */}
          <div className='w-20 md:w-32'>
            <CustImage
              image={{
                src: navLogo.src,
                alt: 'Num 90'
              }}
            />
          </div>

          <div>
            {/* middle nav for mobile */}
            <div className='md:hidden'>
              <MobileMenu items={filteredListItems} />
            </div>
            {/* middle nav for desktop */}
            <NavigationMenu.List
              className={clsx(
                'center',
                'm-0',
                'md:flex',
                'list-none',
                'rounded-lg',
                'bg-skin-base',
                'py-1',
                'px-4',
                'gap-y-4',
                'shadow-md',
                'hidden'
              )}
            >
              {filteredListItems.map(navItem => (
                <NavigationMenu.Item
                  key={navItem.title}
                  className={clsx(
                    'block',
                    'select-none',
                    'rounded-lg',
                    'px-3',
                    'py-2',
                    'text-base',
                    'font-medium',
                    'leading-none',
                    'no-underline',
                    'outline-none',
                    'focus:shadow-[0_0_0_2px]',
                    'hover:underline underline-offset-2'
                  )}
                >
                  <Link href={navItem.href}>{navItem.title}</Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </div>
          {/* right nav */}

          {user === null && (
            <div className='flex gap-x-2 md:gap-x-4'>
              <Button
                color='accent'
                solid={true}
                onClick={() => updateAuthModalVisibility(AuthModelState.SIGNUP)}
              >
                Signup
              </Button>
              <Button
                color='accent'
                onClick={() => updateAuthModalVisibility(AuthModelState.LOGIN)}
              >
                Login
              </Button>
            </div>
          )}
          {user !== null && (
            <UserAvatar
              signout={signout}
              userData={{ name: user.name || '', image: user.profileImg }}
            />
          )}

          <div className='perspective-[2000px] absolute top-full left-0 flex w-full justify-center'>
            <NavigationMenu.Viewport
              className={clsx(
                'data-[state=open]:animate-scaleIn',
                'data-[state=closed]:animate-scaleOut',
                'relative',
                'mt-[10px]',
                'h-[var(--radix-navigation-menu-viewport-height)]',
                'w-full',
                'border',
                'origin-[top_center]',
                'overflow-hidden',
                'rounded-lg',
                'bg-skin-base',
                'transition-[width,_height]',
                'duration-300',
                'sm:w-[var(--radix-navigation-menu-viewport-width)]'
              )}
            />
          </div>
        </NavigationMenu.Root>
        {user && !user.verified && user.email && (
          <div className='max-w-sm mx-auto mt-2 flex flex-col gap-y-1 items-center text-xs md:text-sm p-2 rounded-lg bg-skin-error text-skin-inverted'>
            <span>
              A verification mail has been sent. Please check and verify.
            </span>
            <span>
              <button
                onClick={sendVerificationEmail}
                className='underline underline-offset-2'
              >
                Click here
              </button>{' '}
              to resend verification mail.
            </span>
          </div>
        )}
      </div>
      <AuthComp />
    </>
  );
};

const AuthComp = () => {
  const {
    openAuthModal,
    updateAuthModalVisibility,
    signup,
    login,
    createUserWithGoogle,
    toast,
    dismissToast
  } = useAuth();
  return (
    <>
      <ModalDialog
        open={!!openAuthModal}
        closeModal={() => updateAuthModalVisibility(false)}
      >
        <AuthForm
          activeTab={openAuthModal}
          onLogin={login}
          onSignup={signup}
          createUserWithGoogle={createUserWithGoogle}
          sendResetPasswordLink={() => {}}
        />
      </ModalDialog>
      <Toast
        open={toast.open}
        closeToast={dismissToast}
        toastData={toast.data}
      />
    </>
  );
};

export default Nav;
