import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-my-rating',
  templateUrl: './my-rating.component.html',
  styleUrls: ['./my-rating.component.scss']
})
export class MyRatingComponent implements OnInit {

  ratingArray: any[] = [];
  averageRating = 0.0;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    let partitionKey = this.cookieService.get('id');

    this.retrieveAllRating(partitionKey).subscribe((response: any) => {
      console.log(response);

      this.ratingArray = response;
      this.averageRating = this.ratingArray[this.ratingArray.length - 1].average_rating;
    }, (error: any) => {
      console.log(error);
    });
  }

  retrieveAllRating(partitionKey: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Rating/Collector/' + partitionKey;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

}
