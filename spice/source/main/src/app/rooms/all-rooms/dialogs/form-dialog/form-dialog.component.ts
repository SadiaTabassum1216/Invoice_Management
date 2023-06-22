import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RoomService } from '../../rooms.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Room } from '../../rooms.model';

export interface DialogData {
  id: number;
  action: string;
  room: Room;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  roomForm: UntypedFormGroup;
  room: Room;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public roomService: RoomService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Room';
      this.room = data.room;
    } else {
      this.dialogTitle = 'New Room';
      const blankObject = {} as Room;
      this.room = new Room(blankObject);
    }
    this.roomForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.room.id],
      roomNo: [this.room.roomNo],
      type: [this.room.type],
      acNonac: [this.room.acNonac],
      meal: [this.room.meal],
      capacity: [this.room.capacity],
      phone: [this.room.phone],
      rent: [this.room.rent],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.roomService.addRoom(this.roomForm.getRawValue());
  }
}
