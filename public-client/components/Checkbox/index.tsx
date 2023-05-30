import clsx from 'clsx';
import { FC } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

export interface Props {
  id: string;
  label: string;
  name: string;
  defaultValue?: boolean;
  required?: boolean;
  disabled?: boolean;
  testid?: string;
  description?: string | null;
  errorMessage?: string | null;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<Props> = ({
  id,
  label,
  name,
  defaultValue = false,
  required = false,
  disabled = false,
  testid = '',
  errorMessage = null,
  description = null,
  size = 'md',
  onChange = () => {}
}) => {
  const fontSize = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 'text-xs';

      case 'md':
        return 'text-sm';

      case 'lg':
        return 'text-base';
    }
  };

  return (
    <div className='max-w-xs'>
      <div className='form-check flex gap-x-2'>
        <RadixCheckbox.Root
          name={name}
          id={id}
          defaultChecked={defaultValue}
          disabled={disabled}
          required={required}
          onCheckedChange={onChange}
          className={clsx(
            'shadow-blackA7',
            'flex',
            'h-[20px]',
            'w-[20px]',
            'appearance-none',
            'items-center',
            'justify-center',
            'rounded-md',
            'bg-skin-base',
            'shadow-md',
            'outline-none',
            'border',
            'border-skin-primary',
            'text-skin-accent'
          )}
        >
          <RadixCheckbox.Indicator>
            <CheckIcon width={20} height={20} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>

        <label
          className={clsx(
            'form-check-label',
            'inline-block',
            'text-skin-base',
            'font-medium',
            fontSize(size),
            disabled && 'opacity-60'
          )}
          htmlFor={id}
        >
          {label}
          {required && <span className='text-skin-error'> *</span>}
        </label>
      </div>
      {description && (
        <span className='text-xs text-skin-base'>{description}</span>
      )}
      {errorMessage && (
        <span className='text-xs text-skin-error'>{errorMessage}</span>
      )}
    </div>
  );
};

export default Checkbox;
