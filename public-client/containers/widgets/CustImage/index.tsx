import Image from 'next/image';
import { FC } from 'react';
import { Image as ImageModel } from '../../../data_models';
import defImg from '../../../public/images/logo.png';

interface Props {
  image: ImageModel;
  width?: number;
  height?: number;
}

const CustImage: FC<Props> = ({ image, width = 500, height = 500 }) => {
  return (
    <img
      src={image.src || defImg.src}
      alt={image.alt}
      width={width}
      height={height}
    />
  );

  return (
    <Image
      src={image.src || defImg.src}
      alt={image.alt}
      width={width}
      height={height}
    />
  );
};

export default CustImage;
