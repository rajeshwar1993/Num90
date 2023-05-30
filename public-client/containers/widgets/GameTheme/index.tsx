import clsx from 'clsx';
import { GameTheme } from '../../../data_models';
import { FC } from 'react';
import { ColorSample, SubHeading } from '../../../components';
import CustImage from '../CustImage';
import logoImg from '../../../public/images/logo.jpg';
import bgImage from '../../../public/images/bgImage.jpg';
import ThemePreview from './ThemePreview';

interface Props {
  theme: GameTheme;
}

const imgDefaults = {
  logo: logoImg.src,
  bgImage: bgImage.src
};

const ThemeDisplay: FC<Props> = ({ theme }) => {
  return (
    <div>
      <div className='flex gap-x-4 items-start'>
        <SubHeading styleClasses='mb-2'>Theme: </SubHeading>
        <SubHeading>{theme.pack.name}</SubHeading>
        <ColorSample color={theme.pack.c_primary} label={'primary'} />
        <ColorSample color={theme.pack.c_accent} label={'accent'} />
        <ColorSample color={theme.pack.c_text} label={'text'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 mt-4'>
        <div>
          <span className='font-semibold'>Logo</span>
          <div
            className={clsx(
              'h-16 aspect-square rounded-lg overflow-hidden mt-2 border border-skin-primary'
            )}
          >
            <CustImage
              image={{
                src: theme.logo ? theme.logo.src : imgDefaults.logo,
                alt: 'logo'
              }}
            />
          </div>
        </div>
        <div>
          <span className='font-semibold'>Background</span>
          <div
            className={clsx(
              'h-16 aspect-video rounded-lg overflow-hidden mt-2 border border-skin-primary'
            )}
            style={{
              backgroundColor: `${theme.pack.c_primary}`
            }}
          >
            {theme.bgImage && (
              <CustImage
                image={{
                  src: theme.bgImage.src,
                  alt: 'Background Image'
                }}
              />
            )}
          </div>
        </div>
      </div>
      <ThemePreview
        pack={theme.pack}
        logo={theme.logo?.src}
        bgImage={theme.bgImage?.src}
      />
    </div>
  );
};

export default ThemeDisplay;
