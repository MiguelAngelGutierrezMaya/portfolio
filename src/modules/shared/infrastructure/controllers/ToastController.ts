import { toast } from 'react-toastify';
import type { IToastController } from '@shared/models/controllers/ToastController';

export class ToastController implements IToastController {
  //
  // error shows an error message
  // @param message: string
  //
  error(message: string): void {
    toast.error(message);
  }

  //
  // success shows a success message
  // @param message: string
  //
  success(message: string): void {
    toast.success(message);
  }

  //
  // info shows an info message
  // @param message: string
  //
  info(message: string): void {
    toast.info(message);
  }
}
