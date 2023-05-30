import { Fragment, FC } from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';

interface SelectOption {
  display: React.ReactNode;
  value: string;
  completeObject?: any;
  selected?: boolean;
  disabled?: boolean;
  description?: string;
}

interface Props {
  id: string;
  label?: string;
  name: string;
  options: Array<SelectOption>;
  defaultValue?: SelectOption;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  selectText?: string;
  errorMessage?: string | null;
  description?: string | null;
  onChangeValue?: (value: any) => void;
  testid?: string;
}

const SelectInput: FC<Props> = ({
  id,
  label,
  options,
  name,
  onChangeValue,
  defaultValue,
  value,
  required = false,
  disabled = false,
  selectText = 'Select a option ...',
  errorMessage = null,
  description = null,
  testid = ''
}) => (
  <div className={clsx('form-control w-full', disabled && 'opacity-60')}>
    {label && (
      <label
        className='text-sm font-semibold form-label inline-block mb-2 text-skin-base'
        htmlFor={id}
      >
        {label}
        {required && <span className='text-skin-error'> *</span>}
      </label>
    )}

    <Listbox defaultValue={defaultValue} onChange={onChangeValue}>
      {({ open }) => (
        <div className='relative mt-1'>
          <Listbox.Button
            className={clsx(
              'relative',
              'w-full',
              'cursor-default',
              'rounded-lg',
              'py-2',
              'pl-3',
              'pr-10',
              'text-left',
              'shadow-md',
              'border',
              'focus:outline-none',
              'focus-visible:border-skin-accent',
              'focus-visible:ring-2',
              'focus-visible:ring-white',
              'focus-visible:ring-opacity-75',
              'focus-visible:ring-offset-2',
              'focus-visible:ring-offset-orange-300',
              'sm:text-sm',
              'text-lg',
              'truncate'
            )}
          >
            <>{defaultValue ? defaultValue.display : selectText}</>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              {open ? <TriangleUpIcon /> : <TriangleDownIcon />}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              className={clsx(
                'absolute',
                'mt-1',
                'max-h-60',
                'w-full',
                'overflow-auto',
                'rounded-lg',
                'bg-skin-base',
                'text-base',
                'shadow-lg',
                'ring-1',
                'ring-black',
                'ring-opacity-5',
                'focus:outline-none',
                'sm:text-sm'
              )}
            >
              {options.map(option => (
                <Listbox.Option key={option.value} value={option}>
                  {({ active }) => (
                    <li
                      className={`relative cursor-pointer select-none py-2 pl-10 pr-4 border-b transition duration-150 ${
                        active && 'bg-skin-accent text-skin-inverted'
                      }`}
                    >
                      {option.display}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  </div>
);

export default SelectInput;
{
}
