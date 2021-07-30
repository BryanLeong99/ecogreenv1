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

  loading = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    // clear the array
    this.collectorArray.splice(0);

    let me: any = this;

    // get current geolocation
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);

      // pass the longitude and latitude as the parameter to call the API
      me.retrieveAllCollectors(position.coords.longitude, position.coords.latitude).subscribe((response: any) => {
        console.log(response);

        this.collectorArray = response;
      });
    });

  }

  // call get request to retrieve the list of collectors
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


  rate(collectorID: string, collectorName: string) {
    var dropdownInput: any = document.getElementById(collectorID);

    let ownerID = this.cookieService.get('id');
    let ownerName = this.cookieService.get('name');

    let url = 'https://ecogreen20210725013243.azurewebsites.net/Rating/Rate/';

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    let body = {
      'partition_key': collectorID,
      'collector_name': collectorName,
      'owner_id': ownerID,
      'owner_name': ownerName,
      'rating_value': Number.parseInt(dropdownInput.value)
    };

    console.log(body);

    this.loading = true;

    this.http.put<any>(url, body, { headers }).subscribe((response: any) => {
      console.log(response);
      this.loading = false;

      this.collectorArray.splice(0);

      let me: any = this;

      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Got position", position.coords);

        me.retrieveAllCollectors(position.coords.longitude, position.coords.latitude).subscribe((response: any) => {
          console.log(response);

          this.collectorArray = response;
        });
      });
    }, (error: any) => {
      console.log(error);
      this.loading = false;
    });
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
