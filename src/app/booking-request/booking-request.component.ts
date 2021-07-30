import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { PaymentAlertComponent } from '../payment-alert/payment-alert.component';

@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.scss']
})
export class BookingRequestComponent implements OnInit {

  bookingArray: any[] = [];
  expandBookingID: string = "";
  email: string = "";
  phoneNumber: string = "";

  loading = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.bookingArray.splice(0);

    this.retrieveAllBooking().subscribe((response: any) => {
      console.log(response);
      this.bookingArray = response;
    },
    (error: any) => {
      console.log(error);
    });
  }

  retrieveAllBooking() {
    let partitionKey = this.cookieService.get('id');

    let url = 'https://ecogreen20210725013243.azurewebsites.net/Booking/All/Collector/' + partitionKey;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

  viewContact(rowKey: string, houseHoldID: string) {
    this.expandBookingID = rowKey;
    this.email = "";
    this.phoneNumber = "";

    this.retrieveContactDetails(houseHoldID).subscribe((response: any) => {
      console.log(response);
      this.email = response.email;
      this.phoneNumber = response.phone_number;
    },
    (error: any) => {
      console.log(error);
      this.openDialog('Error;Unexpected error.', 'fail', false);
    });
  }

  updateBookingStatus(status: string, rowKey: string, partitionKey: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Booking/Update/Status/' + rowKey + "/" + partitionKey + "/" + status;

    let headers = {
      'accept': 'text/plain',
    };

    this.loading = true;

    // get user id from the browser's cookies
    let id = this.cookieService.get('id');

    // send patch API request with header, URL and an empty body
    this.http.patch(url, {}, { headers: headers }).subscribe((response: any) => {
      console.log(response);
      this.loading = false;

      this.bookingArray.splice(0);

      // update current location
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Got position", position.coords);

        this.updateLocation(position.coords.longitude, position.coords.latitude, id).subscribe((response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        });
      });

      // refresh the list of booking
      this.retrieveAllBooking().subscribe((response: any) => {
        console.log(response);
        this.bookingArray = response;
      },
      (error: any) => {
        console.log(error);
      });
    }, (error: any) => {
      console.log(error);
      this.loading = false;

      this.openDialog('Error;Unexpected error.', 'fail', false);
    });
  }

  promptPayment(partitionKey: string, bookingID: string, payerID: string, payerName: string, rowKey: string, householdID: string, receiverName: string) {
    let receiverID = householdID;
    this.openPaymentDialog(partitionKey, bookingID, payerID, payerName, receiverID, receiverName, rowKey);
  }

  retrieveContactDetails(houseHoldID: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/User/Contact/' + houseHoldID;

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

  retrieveItems(partitionKey: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/CollectorItem/Items/' + partitionKey;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

  updateLocation(longitude: number, latitude: number, id: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Collector/Update/Location/' + longitude + "/" + latitude + "/" + id;

    let headers = {
      'accept': 'text/plain'
    };

    return this.http.patch(url, {}, { headers: headers });
  }

  openPaymentDialog(partitionKey: string, bookingID: string, payerID: string, payerName: string, receiverID: string, receiverName: string, rowKey: string) {
    this.loading = true;
    this.retrieveItems(partitionKey).subscribe((response: any) => {
      console.log(response);
      this.loading = false;

      const dialogRef = this.dialog.open(PaymentAlertComponent, {
        width: '400px',
        height: '720px',
        data: {
          itemArray: response,
          partitionKey: partitionKey,
          bookingID: bookingID,
          receiverID: receiverID,
          payerID: payerID,
          payerName: payerName,
          receiverName: receiverName,
          rowKey: rowKey
        }
      });
    }, (error: any) => {
      console.log(error);
      this.loading = false;

      this.openDialog('Error;Unexpected error.', 'fail', false);
    });
  }

  locate(longitude: number, latitude: number) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);

      window.open('https://www.google.com/maps/dir/?api=1&origin=' + position.coords.latitude + ',' + position.coords.longitude + '&destination=' + latitude + ',' + longitude, '_blank');
    });
  }

}
