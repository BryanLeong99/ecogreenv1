import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-create-booking-alert',
  templateUrl: './create-booking-alert.component.html',
  styleUrls: ['./create-booking-alert.component.scss']
})
export class CreateBookingAlertComponent implements OnInit {
  householdID = "";
  collectorID = "";
  collectorName = "";
  longitude = 0.0;
  latitude = 0.0;

  loading = false;

  bookingForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    scheduledTime: new FormControl('', Validators.required)
  });

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateBookingAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.householdID = this.data.householdID;
    this.collectorID = this.data.collectorID;
    this.collectorName = this.data.collectorName;
    this.longitude = this.data.longitude;
    this.latitude = this.data.latitude;
  }

  onSubmit() {
    // check if the input is valid
    if (!this.bookingForm.valid) {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail', false);
    } else {
      this.loading = true;

      // call API
      this.confirmSubmit().subscribe((response: any) => {
        console.log(response);
        this.loading = false;
        if (response.status != null && response.status == "") {
          this.openDialog('Invalid Time;You have to book at least one hour earlier from the target time.', 'fail', false);
        } else if (response.status != null && response.status == "Duplicate") {
          this.openDialog('Invalid Time;Duplicated booking is detected.', 'fail', false);
        }else {
          this.openDialog('Booked Successfully;A booking is placed  successfully.', 'success', true);
        }
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
        this.openDialog('Error;Unexpected error, please try again.', 'fail', false);
      });
    }
  }

  // send API request
  confirmSubmit() {
    console.log(this.collectorID);
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Booking/Create/' + this.collectorID + "/" + this.bookingForm.value.date + " " + this.bookingForm.value.scheduledTime;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    let body = {
      'household_id': this.householdID,
      'collector_name': this.collectorName
    }

    // send post API request by specifying the URL, header and request body
    return this.http.post<any>(url, body, { headers });
  }


  onDismiss(): void {
    this.dialogRef.close();
  }

  openDialog(content: string, type: string, refresh: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type, refresh: refresh}
    });
  }


}
