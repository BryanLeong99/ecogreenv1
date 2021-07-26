import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-register-book-item-success-alert',
  templateUrl: './register-book-item-success-alert.component.html',
  styleUrls: ['./register-book-item-success-alert.component.scss']
})
export class RegisterBookItemSuccessAlertComponent implements OnInit {
  value: string = '';

  constructor(
    public dialogRef: MatDialogRef<RegisterBookItemSuccessAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.value = this.data.barcode;
  }

  onOKClick() {
    this.dialogRef.close();
    location.reload();
  }
}
