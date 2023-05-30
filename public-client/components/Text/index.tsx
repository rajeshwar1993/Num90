import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  styleClasses?: string;
}

const BannerHeading: FC<Props> = ({ children, styleClasses = '' }) => {
  return (
    <span
      className={`text-5xl lg:text-7xl xl:text-8xl font-medium block ${styleClasses}`}
    >
      {children}
    </span>
  );
};

const Heading: FC<Props> = ({ children, styleClasses = '' }) => {
  return (
    <span
      className={`text-2xl lg:text-4xl xl:text-5xl font-medium block ${styleClasses}`}
    >
      {children}
    </span>
  );
};

const SubHeading: FC<Props> = ({ children, styleClasses = '' }) => {
  return (
    <span
      className={`text-xl lg:text-2xl xl:text-3xl font-medium block ${styleClasses}`}
    >
      {children}
    </span>
  );
};

const Para: FC<Props> = ({ children, styleClasses = '' }) => {
  return (
    <span className={`text-xs md:text-base font-normal block ${styleClasses}`}>
      {children}
    </span>
  );
};

const Subtext: FC<Props> = ({ children, styleClasses = '' }) => {
  return (
    <span className={`text-xs font-semibold block ${styleClasses}`}>
      {children}
    </span>
  );
};

export { BannerHeading, Heading, SubHeading, Para, Subtext };
