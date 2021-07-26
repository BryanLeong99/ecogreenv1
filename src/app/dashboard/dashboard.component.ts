import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UpdateLimitAlertComponent } from '../update-limit-alert/update-limit-alert.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  totalVisit: number = 0;
  visitPercentage: number = 0.0;

  totalLoan: number = 0;
  loanPercentage: number = 0.0;

  totalCurrentVisit: number = 0;
  capacityPercentage: number = 0.0;
  totalLimit: number = 0;

  titleFontSize = "80px";
  titleColor = "white";
  titleFontFamily = "Nunito";
  titleFontWeight = "700";
  // subtitle = "Capacity";
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
  // barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartLabels = this.labelArray;
  barChartType: ChartType = 'line';
  barChartLegend = false;
  barChartData = [
    {
      // data: [65, 59, 80, 81, 56, 55, 40],
      data: this.dataArray,
      label: 'Series A',
      // pointRadius: 0
    }
  ];
  barChartColors: Color[] = [
    {
      borderColor: '#1070A1',
      backgroundColor: '#1070A1',
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
    this.retrieveUserDetails(this.cookieService.get('authentication-token')).subscribe(data => {
      console.log(data);
      this.name = JSON.parse(data)[0].fullName;
    });

    this.retrieveVisitStatistics().subscribe(data => {
      console.log(data);
      JSON.parse(data).forEach((element: any) => {
        this.labelArray.unshift(element.statDate);
        this.dataArray.unshift(element.total);
        this.calculateVisitPercentage();
        this.chartReady = true;
      });
    });

    this.retrieveTotalLoan().subscribe(data => {
      console.log(data);
      this.calculateLoanPercentage(JSON.parse(data).countToday, JSON.parse(data).countLastDay);
    });

    this.retrieveVisitLimit().subscribe(data => {
      console.log(data);
      this.calculateCapacityPercentage(JSON.parse(data).currentTotal, JSON.parse(data).totalLimit);
    });
  }

  retrieveUserDetails(userToken: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/user/details?' +
    'user_token=' + userToken;

    return this.http.get(url, {responseType: 'text'});
  }

  retrieveVisitStatistics() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/visit/statistics';

    return this.http.get(url, {responseType: 'text'});
  }

  retrieveTotalLoan() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/loan/total';

    return this.http.get(url, {responseType: 'text'});
  }

  retrieveVisitLimit() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/visit/current';

    return this.http.get(url, {responseType: 'text'});
  }

  calculateVisitPercentage() {
    this.totalVisit = this.dataArray[this.dataArray.length - 1];

    if (this.totalVisit > this.dataArray[this.dataArray.length - 2]) {
      this.visitPercentage = ((this.dataArray[this.dataArray.length - 2] - this.totalVisit) / this.totalVisit) * 100 * -1;
    } else {
      this.visitPercentage = ((this.dataArray[this.dataArray.length - 2] - this.totalVisit) / this.totalVisit) * 100;
    }
  }

  calculateLoanPercentage(loanToday: number, loanLastDay: number) {
    this.totalLoan = loanToday;

    if (loanToday > loanLastDay) {
      this.loanPercentage = ((loanLastDay - loanToday) - this.totalLoan) * 100 * -1;
    } else {
      this.loanPercentage = ((loanLastDay - loanToday) - this.totalLoan) * 100;
    }
  }

  calculateCapacityPercentage(currentTotal: number, totalLimit: number) {
    this.totalCurrentVisit = currentTotal;
    this.totalLimit = totalLimit;

    this.capacityPercentage = (currentTotal / totalLimit) * 100;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateLimitAlertComponent, {
      width: '390px',
      height: '360px',
      data: {currentLimit: this.totalLimit}
    });
  }
}
