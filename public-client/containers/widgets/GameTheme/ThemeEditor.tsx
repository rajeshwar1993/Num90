import { GameTheme, ThemeOption } from '../../../data_models';
import { FC, useMemo, useState } from 'react';
import { ColorSample, SelectInput, SubHeading } from '../../../components';
import ImageInput, { SelectedImage } from '../FileInput/ImageInput';
import CustImage from '../CustImage';
import clsx from 'clsx';
import ThemePreview from './ThemePreview';

interface Props {
  chosenTheme: ThemeOption;
  themeOptions: ThemeOption[];
  selectedImages: {
    logo: SelectedImage | null;
    bgImage: SelectedImage | null;
  };
  handleImageChange: (handleFor: 'logo' | 'bg', files: SelectedImage[]) => void;
  handleThemeSelection: (option: any) => void;
}

const ThemeEditor: FC<Props> = ({
  chosenTheme,
  themeOptions,
  selectedImages,
  handleImageChange,
  handleThemeSelection
}) => {
  const themeSelectOptions = useMemo(() => {
    return themeOptions.map(theme => ({
      display: (
        <div className='flex gap-x-4 items-center'>
          <span className='text-base'>{theme.name}</span>
          <ColorSample size={20} color={theme.c_primary} />
          <ColorSample size={20} color={theme.c_accent} />
          <ColorSample size={20} color={theme.c_text} />
        </div>
      ),
      value: theme.value
    }));
  }, []);

  return (
    <div>
      <SubHeading styleClasses='mb-2'>Theme</SubHeading>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-2'>
          <SelectInput
            id='pack'
            name='pack'
            label='Select theme'
            options={themeSelectOptions}
            defaultValue={
              chosenTheme
                ? {
                    display: (
                      <div className='flex gap-x-4 items-center'>
                        <span className='text-base'>{chosenTheme.name}</span>
                        <ColorSample size={20} color={chosenTheme.c_primary} />
                        <ColorSample size={20} color={chosenTheme.c_accent} />
                        <ColorSample size={20} color={chosenTheme.c_text} />
                      </div>
                    ),
                    value: chosenTheme.value
                  }
                : undefined
            }
            onChangeValue={handleThemeSelection}
          />
        </div>

        <div>
          {/* {selectedImages.logo === null && (
            <>
              <span className='font-semibold'>Logo</span>
              <div
                className={clsx(
                  'mb-4 h-24  aspect-square rounded-lg overflow-hidden mt-2 border border-skin-primary'
                )}
              >
                <CustImage
                  image={{
                    src: chosenTheme ? chosenTheme.logo : '',
                    alt: 'logo'
                  }}
                />
              </div>
            </>
          )} */}
          <ImageInput
            id='logo'
            name='logo'
            fileSelectionHandler={handleImageChange.bind(null, 'logo')}
            selectedImages={selectedImages.logo ? [selectedImages.logo] : []}
            label='Upload Custom logo'
            description='Please upload a square image.'
          />
        </div>

        <div>
          {/* {selectedImages.bgImage === null && (
            <>
              <span className='font-semibold'>Background</span>
              <div
                className={clsx(
                  'mb-4 h-24 aspect-video rounded-lg overflow-hidden mt-2 border border-skin-primary'
                )}
              >
                <CustImage
                  image={{
                    src: chosenTheme ? chosenTheme.bgImage : '',
                    alt: 'Background Image'
                  }}
                />
              </div>
            </>
          )} */}
          <ImageInput
            id='bgImage'
            name='bgImage'
            fileSelectionHandler={handleImageChange.bind(null, 'bg')}
            selectedImages={
              selectedImages.bgImage ? [selectedImages.bgImage] : []
            }
            label='Upload Custom Background'
            orientation='landscape'
            description='Please upload a landscape(16:9) image.'
          />
        </div>
      </div>
      <ThemePreview pack={chosenTheme} logo={null} bgImage={null} />
    </div>
  );
};

export default ThemeEditor;
