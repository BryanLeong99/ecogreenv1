import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  name: string = '';
  chartReady: boolean = false;

  labelArray: string[] = [];
  dataArray: number[] = [];

  chartTitle = "Statistic";

  totalVisit: number = 0;
  visitPercentage: number = 0.0;

  totalLoan: number = 0;
  loanPercentage: number = 0.0;

  totalCurrentVisit: number = 0;
  capacityPercentage: number = 0.0;
  totalLimit: number = 0;

  loading = false;
  role = "";

  titleFontSize = "80px";
  titleColor = "white";
  titleFontFamily = "Nunito";
  titleFontWeight = "700";
  subtitleColor = "white"
  subtitleFontSize = "20px";
  subtitleFontWeight = "600";
  backgroundColor = "#2728F2";

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          fontFamily: 'Nunito',
          beginAtZero: true,
        }
      }],
      xAxes: [{
        ticks: {
          fontFamily: 'Nunito'
        }
      }],
    }
  };
  barChartLabels = this.labelArray;
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData = [
    {
      data: this.dataArray,
      label: 'Series A',
    }
  ];
  barChartColors: Color[] = [
    {
      borderColor: '#758BFD',
      backgroundColor: '#758BFD',
    }
  ];

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

  ngOnChanges(): void {

  }

  ngOnInit(): void {
    let id = this.cookieService.get('id');
    this.role = this.cookieService.get('role');
    this.retrieveStatistic(id, this.role).subscribe((response: any) => {
      console.log(response);
      let priceItemSplit: any;

      response.forEach((element: any) => {
        let month: any = "";
        let amount = 0.0;
        let counter = 0;

        element.forEach((element2: any) => {
          let currentTotal = 0.0;
          console.log(new DatePipe('en-US').transform(new Date((Date.parse(element2.time_created))), "MMM / YYYY"));

          month = new DatePipe('en-US').transform(new Date((Date.parse(element2.time_created))), "MMM / YYYY");

          priceItemSplit = element2.price_of_items.split(";");

          for (let counter = 1; counter < priceItemSplit.length; counter += 2) {
            currentTotal += Number.parseFloat(priceItemSplit[counter]);
          }

          amount += currentTotal;

          if (element.length - 1 == counter) {
            this.dataArray.push(amount);
            this.labelArray.push(month);
          }

          counter++;

        });
      });

      console.log(this.dataArray);
    }, (error: any) => {
      console.log(error);
    });




    if (sessionStorage.getItem('first') == 'true') {
      location.reload();
      sessionStorage.setItem('first', 'false');
    }

    this.name = this.cookieService.get('name');

    this.chartReady = true;

  }

  retrieveStatistic(id: string, role: string) {
    let url: string;

    if (role == "Admin") {
      url = 'https://ecogreen20210725013243.azurewebsites.net/Payment/Statistic/Cashout/' + id;
      this.chartTitle = "Cashout Statistic";
    } else {
      url = 'https://ecogreen20210725013243.azurewebsites.net/Payment/Statistic/Earning/' + id;
      this.chartTitle = "Earning Statistic";
    }

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

  calculateVisitPercentage() {
    this.totalVisit = this.dataArray[this.dataArray.length - 1];

    if (this.totalVisit > this.dataArray[this.dataArray.length - 2]) {
      this.visitPercentage = ((this.dataArray[this.dataArray.length - 2] - this.totalVisit) / this.totalVisit) * 100 * -1;
    } else {
      this.visitPercentage = ((this.dataArray[this.dataArray.length - 2] - this.totalVisit) / this.totalVisit) * 100;
    }
  }

  updateLocation() {
    let id = this.cookieService.get('id');
    this.loading = true;
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);

      this.submitUpdate(position.coords.longitude, position.coords.latitude, id).subscribe((response: any) => {
        console.log(response);
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      });
    });
  }

  submitUpdate(longitude: number, latitude: number, id: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Collector/Update/Location/' + longitude + "/" + latitude + "/" + id;

    let headers = {
      'accept': 'text/plain'
    };

    return this.http.patch(url, {}, { headers: headers });
  }
}
