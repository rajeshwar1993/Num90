import { FC } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import clsx from 'clsx';

export interface SimpleSelectOption {
  display: string;
  value: string;
}

interface Props {
  className?: string;
  name: string;
  label?: string;
  options: Array<SimpleSelectOption>;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  selectText?: string;
  onChangeValue?: (value: any) => void;
  testid?: string;
}

const SimpleSelect: FC<Props> = ({
  className = '',
  name,
  label,
  options,
  defaultValue,
  required = false,
  disabled = false,
  selectText = 'select a option ...',
  onChangeValue,
  testid = ''
}) => {
  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      onValueChange={onChangeValue}
      data-testid={testid}
    >
      <SelectTrigger className={clsx('w-full', className)}>
        <SelectValue placeholder={selectText} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map(op => (
            <SelectItem key={op.value} value={op.value}>
              {op.display}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SimpleSelect;
