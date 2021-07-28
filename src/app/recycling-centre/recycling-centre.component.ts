import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-recycling-centre',
  templateUrl: './recycling-centre.component.html',
  styleUrls: ['./recycling-centre.component.scss']
})
export class RecyclingCentreComponent implements OnInit {

  centreArray: any[] = [];
  expandCentreID: string = "";

  itemArray: string[] = [
    'Aluminium',
    'Cardboard',
    'Copper',
    'Glass',
    'Iron',
    'Paper',
    'Plastic'
  ]

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.centreArray.splice(0);

    let me: any = this;

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);

      me.retrieveAllCentres(position.coords.longitude, position.coords.latitude).subscribe((response: any) => {
        console.log(response);

        this.centreArray = response;
      },
      (error: any) =>  {
        console.log(error);
      });
    });
  }

  retrieveAllCentres(longitude: number, latitude: number) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/RecyclingCentre/All/' + longitude + '/' + latitude;

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

  viewDetails(id: string) {
    this.expandCentreID = id;
  }

  locate(longitude: number, latitude: number) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);

      window.open('https://www.google.com/maps/dir/?api=1&origin=' + position.coords.latitude + ',' + position.coords.longitude + '&destination=' + latitude + ',' + longitude, '_blank');
    });
  }

}
