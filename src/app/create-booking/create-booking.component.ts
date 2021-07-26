import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CreateBookingAlertComponent } from '../create-booking-alert/create-booking-alert.component';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {

  collectorArray: any[] = [];
  expandCollectorID: string = "";

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.collectorArray.splice(0);

    let me: any = this;

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);

      me.retrieveAllCollectors(position.coords.longitude, position.coords.latitude).subscribe((response: any) => {
        console.log(response);

        this.collectorArray = response;
      });
    });

  }

  retrieveAllCollectors(longitude: number, latitude: number) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Collector/All/' + longitude + '/' + latitude;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

  viewDetails(id: string) {
    this.expandCollectorID = id;
  }


  onRegisterForm(collectorID: string, collectorName: string) {
    var householdID = this.cookieService.get('id');

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);
      const dialogRef = this.dialog.open(CreateBookingAlertComponent, {
        width: '390px',
        height: '520px',
        data: {
          householdID: householdID,
          collectorID: collectorID,
          collectorName: collectorName,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }
      });
    });
  }


}
