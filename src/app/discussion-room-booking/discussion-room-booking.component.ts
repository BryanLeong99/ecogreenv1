import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-discussion-room-booking',
  templateUrl: './discussion-room-booking.component.html',
  styleUrls: ['./discussion-room-booking.component.scss']
})
export class DiscussionRoomBookingComponent implements OnInit {
  loading = false;

  roomBookingForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(1),
      Validators.max(24),
    ])),
    people: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(3),
      Validators.max(8),
    ])),
    room: new FormControl('', Validators.required),
    description: new FormControl('', {}),
  });

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,  
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.roomBookingForm.valid) {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail');
    } else {
      this.loading = true;
      this.confirmBooking(
        (new Date(this.roomBookingForm.value.date + ' ' + this.roomBookingForm.value.time).getTime() / 1000).toString(),
        this.roomBookingForm.value.duration.toString(),
        this.roomBookingForm.value.people.toString(),
        this.roomBookingForm.value.room,
        this.roomBookingForm.value.description,
        this.cookieService.get('authentication-token')
      ).subscribe(data => {
        console.log(data);
        this.loading = false;
        if (JSON.parse(data).status == 'success') {
          this.openDialog('Book Successfully;Your booking is created successfully.', 'success');
        } else if (JSON.parse(data).status == 'duplication found') {
          this.openDialog('Duplication Found;You are not allowed to have more than one booking at a time.', 'fail');
        } else if (JSON.parse(data).status == 'out of operation') {
          this.openDialog('Out of operation; The room is not operating during the time submitted.', 'fail')
        } else if (JSON.parse(data).status == 'slot not available') {
          this.openDialog('Slot not available;Someone has placed a booking during the slot earlier.', 'fail')
        }
      });
    }
  }

  confirmBooking(startingTime: string, duration: string, people: string, room: string, description: string, userToken: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/booking/new?' 
    + 'starting_time=' + startingTime
    + '&duration=' + duration
    + '&num_of_person=' + people
    + '&room_id=' + room
    + '&description=' + description
    + '&user_token=' + userToken;

    let headers = new Headers();

    return this.http.post(url, JSON.stringify({}), {responseType: 'text'});
  }

  openDialog(content: string, type: string): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type}
    });
  }
}
