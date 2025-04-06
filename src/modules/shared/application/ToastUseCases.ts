import type { IToastController } from '@shared/models/controllers/ToastController';

export class ToastUseCases {
  //
  // ShowError shows an error message
  // @param message: string
  //
  static ShowError(controller: IToastController, message: string): void {
    controller.error(message);
  }

  //
  // ShowSuccess shows a success message
  // @param message: string
  //
  static ShowSuccess(controller: IToastController, message: string) {
    controller.success(message);
  }

  //
  // ShowInfo shows an info message
  // @param message: string
  //
  static ShowInfo(controller: IToastController, message: string) {
    controller.info(message);
  }
}
