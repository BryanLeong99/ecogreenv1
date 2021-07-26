import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.scss']
})
export class BookingRequestComponent implements OnInit {

  bookingArray: any[] = [];
  expandBookingID: string = "";

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

}
