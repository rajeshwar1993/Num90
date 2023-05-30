import { Image, ThemeOption } from '../../../data_models';
import { FC } from 'react';

interface Props {
  pack: ThemeOption;
  logo: string | null;
  bgImage: string | null;
}

const ThemePreview: FC<Props> = ({ pack, logo, bgImage }) => {
  return (
    <div className='grid grid-cols-2'>
      {/* player screen */}
      <div>
        <span>Player screen</span>
        <div
          style={{
            backgroundColor: `${pack.c_primary}`,
            width: '90px',
            height: '160px'
          }}
        ></div>
      </div>
      {/* Display Screen */}
      <div>
        <div>
          <span>Display screen</span>
          <div
            style={{
              backgroundColor: `${pack.c_primary}`,
              width: '160px',
              height: '90px'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
