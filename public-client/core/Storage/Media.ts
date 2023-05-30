import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';

export const uploadMediaToStorage = async (
  file: File,
  filePath: string,
  fileName: string
) => {
  const storageRef = ref(storage, filePath + fileName);

  const snap = await uploadBytes(storageRef, file);

  const downloadUrl = await getDownloadURL(snap.ref);

  return { downloadUrl, fullPath: snap.ref.fullPath };
};

export const uploadMedia = async (
  mediaType: 'image' | 'audio',
  file: File,
  userId: string,
  categoty: 'gameLogo' | 'gameBackground' | 'profileImg',
  associatedId: string, // game id, userId etc
  maxFileSize: number = 5 // in MB
) => {
  try {
    const filePath = `media/${userId}/`;
    const type = file.type.split('/')[0];
    const ext = file.type.split('/')[1];
    const size = file.size;
    const fileName = `${categoty}_${associatedId}.${ext}`;

    //check file extention
    if (mediaType === 'image') {
      // only certain extentions are allowed
      if (!(ext === 'jpg' || ext === 'jpeg' || ext === 'png')) {
        throw Error('Only jpg, jpeg and png are allowed.');
      }
    } else if (mediaType === 'audio') {
      if (!(ext === 'mp3' || ext === 'mpeg')) {
        throw Error('Only mp3 is allowed.');
      }
    }

    const maxSize = maxFileSize * 1024 * 1024 + 1024; //slightly more than maxFileSize MB
    // check file size
    if (size > maxSize) {
      throw Error(
        `Max size exceeded. Max allowed image size is ${maxFileSize}MB.`
      );
    }

    const res = await uploadMediaToStorage(file, filePath, fileName);

    return { downloadUrl: res.downloadUrl, storagePath: res.fullPath };
  } catch (e) {
    // handleRuntimeErrors(e);
    return null;
  }
};
