import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-payment-alert',
  templateUrl: './payment-alert.component.html',
  styleUrls: ['./payment-alert.component.scss']
})
export class PaymentAlertComponent implements OnInit {
  itemArray: any[] = [];

  paymentForm: FormGroup = new FormGroup({
    Aluminium: new FormControl('', {}),
    Cardboard: new FormControl('', {}),
    Copper: new FormControl('', {}),
    Glass: new FormControl('', {}),
    Iron: new FormControl('', {}),
    Paper: new FormControl('', {}),
    Plastic: new FormControl('', {}),
  });

  partitionKey = "";
  bookingID = "";
  payerID = "";
  receiverID = "";
  payerName = "";
  receiverName = "";
  rowKey = "";

  loading = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PaymentAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.itemArray = this.data.itemArray;
    this.partitionKey = this.data.partitionKey;
    this.bookingID = this.data.bookingID;
    this.payerID = this.data.payerID;
    this.payerName = this.data.payerName;
    this.receiverName = this.data.receiverName;
    this.receiverID = this.data.receiverID;
    this.rowKey = this.data.rowKey;
  }

  onSubmit() {
    let priceOfItems = 'Aluminium;' + this.paymentForm.value.Aluminium * this.itemArray[0].charging_rate_per_kg
    + ';Cardboard;' + this.paymentForm.value.Cardboard * this.itemArray[1].charging_rate_per_kg
    + ';Copper;' + this.paymentForm.value.Copper * this.itemArray[2].charging_rate_per_kg
    + ';Glass;' + this.paymentForm.value.Glass * this.itemArray[3].charging_rate_per_kg
    + ';Iron;' + this.paymentForm.value.Iron * this.itemArray[4].charging_rate_per_kg
    + ';Paper;' + this.paymentForm.value.Paper * this.itemArray[5].charging_rate_per_kg
    + ';Plastic;' + this.paymentForm.value.Plastic * this.itemArray[6].charging_rate_per_kg;

    this.loading = true;
    this.createTransaction(this.receiverID, this.bookingID, this.payerID, this.payerName, this.receiverName, priceOfItems).subscribe((response: any) => {
      console.log(response);

      this.updateBookingStatus(this.rowKey, this.partitionKey);
      this.openDialog('Payment Recorded;Payment has been recorded successfully.', 'success', false);
      this.dialogRef.close();
    }, (error: any) => {
      console.log(error);
      this.loading = false;

      this.openDialog('Error;Unexpected error.', 'fail', false);
    });
  }

  createTransaction(partitionKey: string, bookingID: string, payerID: string, payerName: string, receiverName: string, priceOfItems: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Payment/Create/' + partitionKey;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    let body = {
      'booking_id': bookingID,
      'payer_id': payerID,
      'payer_name': payerName,
      'receiver_name': receiverName,
      'price_of_items': priceOfItems
    }

    return this.http.post<any>(url, body, { headers });
  }

  updateBookingStatus(rowKey: string, partitionKey: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Booking/Update/Status/' + rowKey + "/" + partitionKey + "/" + 'Completed';

    let headers = {
      'accept': 'text/plain',
    };

    this.http.patch(url, {}, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      this.loading = false;

    }, (error: any) => {
      console.log(error);
      this.loading = false;

      this.openDialog('Error;Unexpected error.', 'fail', false);
    });
  }

  onDismiss() {
    this.dialogRef.close();
  }

  openDialog(content: string, type: string, refresh: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type, refresh: refresh}
    });
  }



}
