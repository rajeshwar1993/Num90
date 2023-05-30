import clsx from 'clsx';
import { ChangeEventHandler, FC } from 'react';

interface Props {
  id: string;
  label?: string;
  placeholder?: string;
  name: string;
  type?: 'text' | 'number' | 'date' | 'email' | 'password';
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  styleClasses?: string;
  size?: 'sm' | 'md' | 'lg';
  errorMessage?: string | null;
  description?: string | null;
  testid?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const TextInput: FC<Props> = ({
  id,
  label,
  name = '',
  placeholder = 'Start typing ...',
  type = 'text',
  defaultValue = '',
  required = false,
  readOnly = false,
  disabled = false,
  styleClasses = '',
  size = 'md',
  errorMessage = null,
  description = null,
  testid = '',
  onChange = () => {}
}) => {
  return (
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
      <input
        id={id}
        data-testid={testid}
        type={type}
        placeholder={placeholder}
        name={name}
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
          'focus:outline-none',
          styleClasses
        )}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        defaultValue={defaultValue}
        onChange={onChange}
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

export default TextInput;
