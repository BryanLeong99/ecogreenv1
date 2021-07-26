import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CreateBookingAlertComponent } from '../create-booking-alert/create-booking-alert.component';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  bookingArray: any[] = [];
  expandContactID: string = "";
  email: string = "";
  phoneNumber: string = "";

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.bookingArray.splice(0);
    var id = this.cookieService.get('id');

    this.retrieveAllBooking(id).subscribe((response: any) => {
      console.log(response);

      this.bookingArray = response;
    },
    (error: any) => {
      // this.openDialog('Invalid Input;Your input is invalid.', 'fail', false);
    });
  }

  retrieveAllBooking(id: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Booking/All/Household/' + id;

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

  viewContact(rowKey: string, partitionKey: string) {
    this.expandContactID = rowKey;
    this.email = "";
    this.phoneNumber = "";

    this.retrieveContactDetails(partitionKey).subscribe((response: any) => {
      console.log(response);
      this.email = response.email;
      this.phoneNumber = response.phone_number;
    },
    (error: any) => {
      console.log(error);
      this.openDialog('Error;Unexpected error.', 'fail', false);
    });
  }

  retrieveContactDetails(partitionKey: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/User/Contact/' + partitionKey;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

}
