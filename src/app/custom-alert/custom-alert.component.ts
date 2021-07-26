import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent implements OnInit {
  title: string = '';
  content: string = '';
  type: string = 'success';
  refresh?: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    let split = this.data.content.split(';');
    this.title = split[0];
    this.content = split[1];

    this.type = this.data.type == 'success' ? 'success' : 'fail';

    this.refresh = this.data.refresh != null ? this.data.refresh : false;
  }

  onOKClick() {
    this.dialogRef.close();
    // if (this.refresh) {
    //   location.reload()
    // }
  }

}
