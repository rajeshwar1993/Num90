'use client';

import Link from 'next/link';
import { FC, Fragment, useMemo } from 'react';
import { ModalDialog, Toast } from '../../components';
import useAuth from '../../app/AuthProvider';
import { AuthModelState } from '../../constants/enums';
import clsx from 'clsx';
import { Image, NavItem } from '../../data_models';
import AvatarComp from '../widgets/Avatar';
import { Menu, Transition } from '@headlessui/react';
import AuthForm from '../widgets/AuthForm';
import Routes from '../../constants/routes';
import CustImage from '../widgets/CustImage';
import navLogo from '../../public/images/HWL1.png';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent position='top' size='content'>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {items.map(item => (
          <Link href={item.href} key={item.title}>
            <SheetClose asChild>
              <div>
                <small className='text-sm font-medium leading-none'>
                  {item.title}
                </small>

                <Separator className='my-4' />
              </div>
            </SheetClose>
          </Link>
        ))}

        <SheetFooter>
          <SheetClose asChild>
            <Button type='button'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
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
    const listItems: NavItem[] = [];

    navItems.forEach(navItem => {
      if (!navItem.isAuthReq || (isAuth && navItem.isAuthReq)) {
        listItems.push(navItem);
      }
    });
    return listItems;
  }, [user, navItems]);

  return (
    <>
      <div className='relative z-[1] flex justify-between items-center'>
        {/* logo */}
        <div className='w-20 md:w-32'>
          <CustImage
            image={{
              src: navLogo.src,
              alt: 'Num 90'
            }}
          />
        </div>

        {/* middle nav for desktop */}
        <div className='hidden md:block'>
          <NavigationMenu>
            <NavigationMenuList>
              {filteredListItems.map(item => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* right nav */}
        <div className='flex gap-2'>
          {user === null && (
            <div className='flex gap-x-2 md:gap-x-4'>
              <Button
                variant={'secondary'}
                onClick={() => updateAuthModalVisibility(AuthModelState.SIGNUP)}
              >
                Signup
              </Button>
              <Button
                variant={'outline'}
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
          {/* middle nav for mobile */}
          <div className='md:hidden'>
            <MobileMenu items={filteredListItems} />
          </div>
        </div>
      </div>

      <AuthComp />
    </>
  );
};

const AuthComp = () => {
  const {
    openAuthModal,
    loading,
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
          loading={loading}
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
