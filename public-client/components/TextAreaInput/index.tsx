import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  id: string;
  label?: string;
  placeholder?: string;
  name: string;
  rows?: number;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  errorMessage?: string | null;
  description?: string | null;
  testid?: string;
}

const TextAreaInput: FC<Props> = ({
  id,
  label,
  name = '',
  rows = 4,
  placeholder = 'Start typing ...',
  defaultValue = '',
  required = false,
  readOnly = false,
  disabled = false,
  errorMessage = null,
  description = null,
  testid = ''
}) => {
  return (
    <div className={clsx('form-control', 'w-full', disabled && 'opacity-60')}>
      {label && (
        <label
          className='text-sm font-semibold form-label inline-block mb-2 text-skin-base'
          htmlFor={id}
        >
          {label}
          {required && <span className='text-skin-error'> *</span>}
        </label>
      )}
      <textarea
        id={id}
        data-testid={testid}
        placeholder={placeholder}
        name={name}
        rows={rows}
        className={clsx(
          'form-control',
          'block',
          'w-full',
          'px-3',
          'py-1.5',
          'text-base',
          'font-normal',
          'text-skin-base',
          'bg-skin-base',
          'bg-clip-padding',
          'border',
          'border-solid',
          'border-skin-base',
          'rounded',
          'transition',
          'ease-in-out',
          'm-0',
          'focus:text-skin-base',
          'focus:bg-skin-base',
          'focus:border-skin-primary',
          'focus:outline-none'
        )}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        defaultValue={defaultValue}
      />
      {description && (
        <span className='text-xs text-skin-base'>{description}</span>
      )}
      {errorMessage && (
        <span className='text-xs text-skin-error'>{errorMessage}</span>
      )}
    </div>
  );
};

export default TextAreaInput;
