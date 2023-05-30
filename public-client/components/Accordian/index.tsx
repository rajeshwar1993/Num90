import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface Props {
  items: Array<{
    id: string;
    header: ReactNode;
    content: ReactNode;
    pinger?: boolean;
  }>;
}

const AccordionComp: FC<Props> = ({ items }) => (
  <Accordion.Root
    className={clsx('bg-transparent', 'w-full')}
    type='single'
    defaultValue='item-1'
    collapsible
  >
    {items.map(item => (
      <Accordion.Item
        value={item.id}
        key={item.id}
        className={clsx(
          'my-2',
          'first:mt-0',
          'rounded-lg',
          'border',
          'border-skin-primary',
          'relative'
        )}
      >
        {item.pinger && (
          <span className='absolute -left-1 -top-1 flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-skin-accent opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-skin-accent'></span>
          </span>
        )}
        <Accordion.Header className='flex'>
          <Accordion.Trigger
            className={clsx(
              'text-skin-primary',
              'group',
              'flex',
              'flex-1',
              'cursor-pointer',
              'items-center',
              'justify-between',
              'bg-transparent',
              'px-5',
              'leading-none',
              'shadow-[0_1px_0]',
              'outline-none'
            )}
          >
            <>{item.header}</>
            <ChevronDownIcon
              className='text-skin-primary ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180'
              aria-hidden
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content
          className={clsx(
            'text-skin-primar bg-transparent data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]'
          )}
        >
          <div className='py-[15px] px-5'>
            <>{item.content}</>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);

export default AccordionComp;
