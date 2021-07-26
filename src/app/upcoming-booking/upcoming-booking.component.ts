import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upcoming-booking',
  templateUrl: './upcoming-booking.component.html',
  styleUrls: ['./upcoming-booking.component.scss']
})
export class UpcomingBookingComponent implements OnInit {
  result = false;

  bookingArray: any[] = [];

  constructor(
    private http: HttpClient,
    
  ) { }

  ngOnInit(): void {
    this.result = false;
    this.retrieveUpcomingBooking().subscribe(data => {
      console.log(data);

      this.bookingArray.splice(0);

      let endingTime;
      let startingTime;
      let date;
      if (JSON.parse(data).length > 0) {
        this.result = true;
        JSON.parse(data).forEach((element: any) => {
          endingTime = new DatePipe('en-US').transform(new Date((+element.time + (element.duration * 3600)) * 1000), 'hh:mm a');
  
          startingTime =  new DatePipe('en-US').transform(new Date(element.time * 1000), 'hh:mm a');

          date = new DatePipe('en-US').transform(new Date(element.time * 1000), 'MMM d, y');
  
          this.bookingArray.push(
            {
              "startingTime": startingTime,
              "endingTime": endingTime,
              "person": element.person,
              "description": element.description,
              "room": element.room,
              "name": element.name,
              "date": date,
            }
          );
        });
      } 

    })
  }

  retrieveUpcomingBooking() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/booking/all';

    return this.http.get(url, {responseType: 'text'});
  }
}
