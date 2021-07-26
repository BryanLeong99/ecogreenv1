import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-authenticate-failed-alert',
  templateUrl: './authenticate-failed-alert.component.html',
  styleUrls: ['./authenticate-failed-alert.component.scss']
})
export class AuthenticateFailedAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AuthenticateFailedAlertComponent>) { }

  ngOnInit(): void {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
