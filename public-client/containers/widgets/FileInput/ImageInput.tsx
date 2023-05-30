import { v4 as uuidv4 } from 'uuid';
import React, { FC, useRef } from 'react';
import { Image } from '../../../data_models';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, Para } from '../../../components';
import clsx from 'clsx';

export interface SelectedImage {
  savedImage: Image | null;
  tempData: null | {
    uid: string;
    base64Data: string;
    file: File;
  };
}

interface Props {
  label?: string;
  name: string;
  id: string;
  description?: string;
  selectedImages: SelectedImage[];
  multiple?: boolean;
  maxSize?: number; // in MB
  orientation?: 'square' | 'landscape';
  fileSelectionHandler: (files: SelectedImage[]) => void;
}

const ImageInput: FC<Props> = ({
  label,
  name,
  id,
  description,
  selectedImages,
  multiple = false,
  maxSize = 5,
  orientation = 'square',
  fileSelectionHandler
}) => {
  const ref = useRef<any>();
  let accept = 'image/jpg,image/jpeg,image/png';
  let btnText = 'Select Image';

  const onChange = () => {
    let files: File[] = ref.current.files;
    const selectedTempImages: SelectedImage[] = [];

    if (files && files.length) {
      const count = files.length;

      for (let file of files) {
        // check file size
        const maxImageSize = maxSize * 1024 * 1024 + 1024; //slightly more than defined size
        // check file size
        if (file.size > maxImageSize) {
          //   handleRuntimeErrors(
          //     `Max size exceeded. Max allowed image size is ${maxSize}MB.`,
          //     'max-file-size',
          //     true,
          //     false
          //   );
        } else {
          let reader = new FileReader();
          reader.readAsDataURL(file); // convert to base64 string

          reader.onload = (e: any) => {
            const si: SelectedImage = {
              savedImage: null,
              tempData: {
                uid: uuidv4(),
                base64Data: e.target.result,
                file: file
              }
            };

            selectedTempImages.push(si);

            if (selectedTempImages.length === count) {
              fileSelectionHandler(selectedTempImages);
            }
          };
        }
      }
    }
  };

  const onRemove = (img: SelectedImage) => {
    let remaining = selectedImages.filter(si => {
      return (
        si.savedImage?.uid !== img.savedImage?.uid ||
        si.tempData?.uid !== img.tempData?.uid
      );
    });

    fileSelectionHandler(remaining);
  };

  return (
    <div>
      {label !== undefined && (
        <span className='text-sm font-semibold form-label inline-block mb-2 text-skin-base'>
          {label}
        </span>
      )}
      <div>
        {selectedImages.length === 0 && (
          <>
            <Button
              color='primary'
              size='sm'
              onClick={() => ref.current.click()}
            >
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
              multiple={multiple}
            />
          </>
        )}

        {selectedImages.length > 0 && (
          <div className='flex gap-x-4 items-center'>
            {selectedImages.map((img, index) => (
              <div key={index} className='relative'>
                {img.savedImage === null && (
                  <div
                    className={clsx(
                      'h-32',
                      'bg-cover',
                      'bg-center',
                      'rounded-lg',
                      orientation === 'square'
                        ? 'aspect-square'
                        : 'aspect-video'
                    )}
                    style={{
                      backgroundImage: `url(${img.tempData?.base64Data})`
                    }}
                  />
                )}

                <Button
                  onlyIcon={true}
                  solid={true}
                  styleClasses='absolute -top-3 -right-3'
                  onClick={() => onRemove(img)}
                >
                  <Cross2Icon />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {description !== undefined && (
        <span className={'mt-1 max-w-xs text-xs'}>{description}</span>
      )}
    </div>
  );
};

export default ImageInput;
