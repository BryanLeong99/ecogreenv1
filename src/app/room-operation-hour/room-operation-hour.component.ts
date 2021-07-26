import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeOperationHourAlertComponent } from '../change-operation-hour-alert/change-operation-hour-alert.component';

@Component({
  selector: 'app-room-operation-hour',
  templateUrl: './room-operation-hour.component.html',
  styleUrls: ['./room-operation-hour.component.scss']
})
export class RoomOperationHourComponent implements OnInit {

  roomArray: any[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
    this.roomArray.splice(0);
    this.retrieveAllRoom().subscribe(data => {
      console.log(data);

      let startingTime;
      let endingTime;
      JSON.parse(data).forEach((element: any) => {
        startingTime = new DatePipe('en-US').transform(new Date('2021-07-14T' + element.startingTime.toString().padStart(2, '0') + ':00:00'), 'hh:mm a');
        endingTime = new DatePipe('en-US').transform(new Date('2021-07-14T' + element.endingTime.toString().padStart(2, '0') + ':00:00'), 'hh:mm a');

        this.roomArray.push(
          {
            "startingTime": startingTime,
            "endingTime": endingTime,
            "capacity": element.capacity,
            "roomId": element.roomId,
            "roomName": element.roomName,
            "startingTimeValue": element.startingTime,
            "endingTimeValue": element.endingTime,
          }
        );
      });
    });
  }

  retrieveAllRoom() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/room/details/all';

    return this.http.get(url, {responseType: 'text'});
  }

  triggerDialog(startingTime: string, endingTime: string, roomName: string, roomId: string): void {
    this.openChangeHourDialog(startingTime.toString(), endingTime.toString(), roomName, roomId);
  }

  openChangeHourDialog(startingTime: string, endingTime: string, roomName: string, roomId: string): void {
    const dialogRef = this.dialog.open(ChangeOperationHourAlertComponent, {
      width: '390px',
      height: '450px',
      data: {startingTime: startingTime, endingTime: endingTime, roomName: roomName, roomId: roomId}
    });
  }

}
