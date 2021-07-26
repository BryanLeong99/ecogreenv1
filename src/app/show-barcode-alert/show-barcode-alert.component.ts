import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-show-barcode-alert',
  templateUrl: './show-barcode-alert.component.html',
  styleUrls: ['./show-barcode-alert.component.scss']
})
export class ShowBarcodeAlertComponent implements OnInit {
  value: string = '';

  constructor(
    public dialogRef: MatDialogRef<ShowBarcodeAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.value = this.data.barcode;
  }

  onOKClick() {
    this.dialogRef.close();
  }
}
