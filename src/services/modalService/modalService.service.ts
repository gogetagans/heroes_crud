import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ConfirmationModalComponent from '../../app/components/shared/modals/confirmationModal/confirmationModal.component';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ModalService implements OnDestroy{
  private subscription = new Subscription();
  private confirmActionSubject$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}
  
  get confirmAction$() {
    return this.confirmActionSubject$.asObservable();
  }
  
  /**
   * Opens a dialog to display a confirmation modal.
  */
 openDialog() {
   const dialogRef = this.dialog.open(ConfirmationModalComponent, { width: '250px' });

   this.subscription.add(dialogRef.afterClosed().subscribe((action: boolean) => {
     if (action) {
       this.confirmActionSubject$.next();
     }
   }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
