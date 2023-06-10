import { FC } from 'react';
import { RadioGroup as HUIRadio } from '@headlessui/react';
import { CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface Props {
  id: string;
  name: string;
  defaultValue?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  testid?: string;
  items: Array<{ value: string; label: string; disabled?: boolean }>;
  onChange?: (value: string) => void;
}

const RadioGroup: FC<Props> = ({
  id,
  name,
  disabled,
  testid,
  items,
  onChange = () => {}
}) => (
  <div className='w-full'>
    <div className='mx-auto w-full max-w-md'>
      <HUIRadio name={name} id={id} disabled={disabled} data-testid={testid}>
        <div className='grid grid-cols-2 gap-3'>
          {items.map(item => (
            <HUIRadio.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={({ active, checked }) =>
                `${active ? 'ring-2 ring-white' : ''}
            ${
              checked
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-primary'
            }
              relative flex cursor-pointer rounded-lg p-2 shadow-md focus:outline-none border border-skin-primary`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='text-sm'>
                        <HUIRadio.Label
                          as='p'
                          className={`font-medium  ${
                            checked ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {item.label}
                        </HUIRadio.Label>
                        <HUIRadio.Description
                          as='span'
                          className={`inline ${
                            checked ? 'text-sky-100' : 'text-gray-500'
                          }`}
                        ></HUIRadio.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className='shrink-0 text-white'>
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                </>
              )}
            </HUIRadio.Option>
          ))}
        </div>
      </HUIRadio>
    </div>
  </div>
);

export default RadioGroup;
