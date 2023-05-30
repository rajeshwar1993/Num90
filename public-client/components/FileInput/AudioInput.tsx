import React, { FC, useRef } from 'react';
import { handleRuntimeErrors } from '../../../core/commonHandlers';
import { Audio } from '../../../models';
import { IconNames } from '../../Icon';
import Button from '../Button';
import IconButton from '../Button/IconButton';
import Subtext from '../Text/Subtext';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export interface SelectedAudio {
  savedAudio: Audio | null;
  tempData: null | {
    objUrl: string;
    file: File;
  };
}

interface Props {
  label?: string;
  name: string;
  id: string;
  description?: string;
  defaultSelected: SelectedAudio;
  maxSize?: number; // in MB
  fileSelectionHandler: (file: SelectedAudio) => void;
}

const AudioInput: FC<Props> = ({
  label,
  name,
  id,
  description,
  defaultSelected,
  maxSize = 5,
  fileSelectionHandler
}) => {
  const ref = useRef<any>();
  let accept = 'audio/mp3';
  let btnText = 'Select Audio';

  const onChange = () => {
    let files: File[] = ref.current.files;

    if (files && files.length) {
      const count = files.length;

      if (count > 0) {
        const file = files[0];
        // check file size
        const maxImageSize = maxSize * 1024 * 1024 + 1024; //slightly more than defined size
        // check file size
        if (file.size > maxImageSize) {
          handleRuntimeErrors(
            `Max size exceeded. Max allowed image size is ${maxSize}MB.`,
            'max-file-size',
            true,
            false
          );
        } else {
          const objUrl = URL.createObjectURL(file);

          const selectedTempAudio: SelectedAudio = {
            savedAudio: null,
            tempData: {
              objUrl,
              file
            }
          };

          console.log(selectedTempAudio);

          fileSelectionHandler(selectedTempAudio);
        }
      }
    }
  };

  const onRemove = () => {
    const selectedTempAudio: SelectedAudio = {
      savedAudio: null,
      tempData: null
    };

    fileSelectionHandler(selectedTempAudio);
  };

  return (
    <div>
      {label !== undefined && (
        <span className='text-sm font-semibold form-label inline-block mb-2 text-skin-base'>
          {label}
        </span>
      )}
      <div>
        {defaultSelected.savedAudio === null &&
          defaultSelected.tempData === null && (
            <>
              <Button color='primary' onClick={() => ref.current.click()}>
                {btnText}
              </Button>
              <input
                id={id}
                name={name}
                type='file'
                accept={accept}
                style={{ display: 'none' }}
                ref={ref}
                onChange={onChange}
              />
            </>
          )}

        {(defaultSelected.savedAudio !== null ||
          defaultSelected.tempData !== null) && (
          <div className='relative w-full max-w-[280px]'>
            <AudioPlayer
              src={
                defaultSelected.savedAudio?.src ||
                defaultSelected.tempData?.objUrl ||
                ''
              }
              showJumpControls={false}
              customAdditionalControls={[]}
            />
            {/* <Button
              onClick={onRemove}
              look='link'
              styleClasses='absolute -top-8 -right-4'
            >
              Remove
            </Button> */}
            <IconButton
              size='sm'
              icon={IconNames.Close}
              styleClasses='absolute -top-3 -right-3'
              onClick={onRemove}
            />
          </div>
        )}
      </div>
      {description !== undefined && (
        <Subtext text={description} styleClasses={'mt-1 max-w-xs text-xs'} />
      )}
    </div>
  );
};

export default AudioInput;
