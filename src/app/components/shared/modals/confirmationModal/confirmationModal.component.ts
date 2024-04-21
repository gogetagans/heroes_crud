import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-confirmationModal',
  templateUrl: './confirmationModal.component.html',
  styleUrls: ['./confirmationModal.component.scss'],
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export default class ConfirmationModalComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  onClickCancel() {
    this.dialogRef.close(false);
  }

  onClickConfirm() {
    this.dialogRef.close(true);
  }

}
