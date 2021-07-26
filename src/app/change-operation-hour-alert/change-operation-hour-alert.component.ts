import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-change-operation-hour-alert',
  templateUrl: './change-operation-hour-alert.component.html',
  styleUrls: ['./change-operation-hour-alert.component.scss']
})
export class ChangeOperationHourAlertComponent implements OnInit {
  roomName: string = "";
  startingTime: string = "";
  endingTime: string = "";
  roomId: string = "";
  loading = false;

  changeOperationHourForm: FormGroup = new FormGroup({
    startingTime: new FormControl('', Validators.required),
    endingTime: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<ChangeOperationHourAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.roomName = this.data.roomName;
    this.startingTime = this.data.startingTime;
    this.endingTime = this.data.endingTime;
    this.roomId = this.data.roomId;
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.changeOperationHourForm.valid) {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail', false);
    } else {
      this.loading = true;
      this.confirmUpdate(
        this.changeOperationHourForm.value.startingTime,
        this.changeOperationHourForm.value.endingTime,
        this.roomId
      ).subscribe(data => {
        console.log(data)
        this.loading = false;
        if (JSON.parse(data).status == 'success') {
          this.openDialog('Updated Successfully;Room operation hours are updated successfully.', 'success', true);
        } else {
          this.openDialog('Unexpected error. Please try again later.', 'fail', true);
        }
      });
    }
  }

  confirmUpdate(startingTime: string, endingTime: string, roomId: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/room/update/operation-hour?'
    + 'starting_time=' + startingTime
    + '&ending_time=' + endingTime
    + '&room_id=' + roomId;

    let headers = new Headers();

    return this.http.post(url, JSON.stringify({}), {responseType: 'text'});
  }

  openDialog(content: string, type: string, refresh: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type, refresh: refresh}
    });
  }
}
