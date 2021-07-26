import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-pay-fine-confirmation-alert',
  templateUrl: './pay-fine-confirmation-alert.component.html',
  styleUrls: ['./pay-fine-confirmation-alert.component.scss']
})
export class PayFineConfirmationAlertComponent implements OnInit {
  amount: number = 0;
  fineRecordId: string = "";
  loading = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<PayFineConfirmationAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.amount = this.data.amount;
    this.fineRecordId = this.data.fineRecordId;
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.loading = true;
    this.updateFine(
      this.fineRecordId
    ).subscribe(data => {
      console.log(data);
      this.loading = false;
      if (JSON.parse(data).status == 'success') {
        this.onDismiss();
        this.openDialog('Payment Made Successfully;The payment has recorded into the system successfully.', 'success', true);
      } else {
        this.openDialog('Unexpected error. Please try again later.', 'fail', false);
      }
    });
  }

  updateFine(fineRecordId: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/fine-history/pay?'
    + 'fine_record_id=' + encodeURIComponent(fineRecordId);

    let headers = new Headers();

    return this.http.post(url, JSON.stringify({}), {responseType: 'text'});
  }

   openDialog(content: string, type: string, refresh: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '340px',
      data: {content: content, type: type, refresh: refresh}
    });
  }
}
