import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CreateBookingAlertComponent } from '../create-booking-alert/create-booking-alert.component';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  transactionArray: any[] = [];
  expandTransactionID: string = "";
  priceBreakdownArray: any[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.transactionArray.splice(0);

    this.retrieveAllTransactions().subscribe((response: any) => {
      console.log(response);
      this.transactionArray = response;
    },
    (error: any) => {
      console.log(error);
    });
  }

  retrieveAllTransactions() {
    let partitionKey = this.cookieService.get('id');
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Payment/All/Receiver/' + partitionKey;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

  openDialog(content: string, type: string, refresh: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type, refresh: refresh}
    });
  }

  viewDetails(id: string, priceItem: string) {
    this.priceBreakdownArray.splice(0);
    this.expandTransactionID = id;

    let tempArray = priceItem.split(';');

    for (let counter = 0; counter < tempArray.length; counter += 2) {
      this.priceBreakdownArray.push({
        'item': tempArray[counter],
        'price': Number.parseFloat(tempArray[counter + 1])
      });
    }
  }
}
