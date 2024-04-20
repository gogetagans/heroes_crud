import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Service for displaying messages using a snackbar.
 */
@Injectable({
  providedIn: 'root'
})
export default class MessageService {

  constructor(private _snackbar: MatSnackBar) { }

  /**
   * Displays a message in a snackbar.
   * @param message The message to be displayed.
   * @param duration The duration in milliseconds for which the snackbar should be visible. Default is 5000ms.
   */
  showMessage(message: string, duration: number = 3000) {
    this._snackbar.open(message, 'Close', {
      duration,
    });
  }

}
