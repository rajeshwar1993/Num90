import { FC } from 'react';

interface Props {
  color: string;
  label?: string;
  size?: number;
}

const ColorSample: FC<Props> = ({ color, label = '', size = 30 }) => {
  return (
    <div className='text-xs font-semibold flex flex-col items-center gap-y-0'>
      <div
        style={{
          backgroundColor: `${color}`,
          width: `${size}px`,
          height: `${size}px`
        }}
        className='rounded-lg border border-skin-primary'
      ></div>
      {label && <span>{label}</span>}
    </div>
  );
};

export default ColorSample;
