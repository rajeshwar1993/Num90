export interface ToastData {
  title: string;
  message: string;
  type: 'info' | 'error';
  duration?: number;
}
