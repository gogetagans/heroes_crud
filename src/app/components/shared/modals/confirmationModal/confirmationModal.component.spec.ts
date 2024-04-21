/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import  ConfirmationModalComponent  from './confirmationModal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let dialogRefMock: MatDialogRef<ConfirmationModalComponent>;

  beforeEach(async(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [ ConfirmationModalComponent,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with false value when cancel button is clicked', () => {
    component.onClickCancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true value when confirm button is clicked', () => {
    component.onClickConfirm();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });
});