import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-limit-failed-alert',
  templateUrl: './update-limit-failed-alert.component.html',
  styleUrls: ['./update-limit-failed-alert.component.scss']
})
export class UpdateLimitFailedAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateLimitFailedAlertComponent>) { }

  ngOnInit(): void {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
