export interface Image {
  uid?: string;
  src: string;
  path?: string;
  alt: string;
}

export const DEFAULT_Image: Image = {
  uid: '',
  src: '',
  path: '',
  alt: ''
};
