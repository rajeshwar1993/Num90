import { GameMetaGlanceModel } from '../../../data_models';
import { FC } from 'react';
import CustImage from '../CustImage';
import logo from '../../../public/images/logo.png';

interface Props {
  glance: GameMetaGlanceModel;
}

const QuickGameGlance: FC<Props> = ({ glance }) => {
  return (
    <div className='flex flex-col items-center gap-y-2'>
      <div className='rounded-lg overflow-hidden border border-skin-primary'>
        <CustImage
          image={{
            alt: 'Logo',
            src: logo.src
          }}
          height={100}
          width={100}
        />
      </div>

      <div className='text-lg font-semibold'>{glance.title}</div>
      <div className='text-xs font-semibold'>{glance.tagline}</div>
    </div>
  );
};

export default QuickGameGlance;
