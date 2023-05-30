import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  href: string;
}

const CustomLink: FC<Props> = ({ href, children }) => {
  return (
    <a
      className={clsx(
        'text-skin-primary',
        'hover:text-skin-primary-hover',
        'transition',
        'duration-300',
        'ease-in-out'
      )}
      href={href}
    >
      {children}
    </a>
  );
};

export default CustomLink;
