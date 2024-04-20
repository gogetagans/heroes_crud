import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ConfirmationModalComponent from '../../app/components/shared/modals/confirmationModal/confirmationModal.component';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ModalService implements OnDestroy{
  subscription = new Subscription();
  private confirmActionSubject$ = new Subject<void>();
  
  constructor(public dialog: MatDialog) {
    this.subscription.add(this.dialog.afterAllClosed.subscribe(() => this.confirmActionSubject$.next()));
  }
  
  get confirmAction$() {
    return this.confirmActionSubject$.asObservable();
  }
  
  /**
   * Opens a dialog to display a confirmation modal.
  */
 openDialog() {
   this.dialog.open(ConfirmationModalComponent, { width: '250px' });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
