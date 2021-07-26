import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-approve-registration',
  templateUrl: './approve-registration.component.html',
  styleUrls: ['./approve-registration.component.scss']
})
export class ApproveRegistrationComponent implements OnInit {
  result = false;
  loading = false;

  requestArray: any[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
    this.result = false;
    this.retrieveRegistrationRequest().subscribe(data => {
      console.log(data);

      this.requestArray.splice(0);

      let date;
      if (JSON.parse(data).length > 0) {
        this.result = true;
        JSON.parse(data).forEach((element: any) => {
          date = new DatePipe('en-US').transform(new Date(element.date * 1000), 'MMM d, y');

          this.requestArray.push({
            "requestId": element.requestId,
            "fullName": element.fullName,
            "tpNumber": element.tpNumber,
            "email": element.email,
            "contactNumber": element.contactNumber,
            "date": date,
          });
        });
      }
    });
  }

  onUpdate(requestId: string, status: boolean) {
    this.loading = true;
    let statusString: string = status ? '1' : '2';

    this.confirmUpdate(requestId, statusString).subscribe(data => {
      console.log(data);
      if (JSON.parse(data).status == 'success') {
        this.openDialog('Updated Successfully;The registration request status has been updated.', 'success', true);
      } else {
        this.openDialog('Unexpected error. Please try again later.', 'fail', false);
      }
    });
  }

  confirmUpdate(requestId: string, status: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/sign-up/request/approve?'
    + 'request_id=' + requestId
    + '&status=' + status;
    
    let headers = new Headers();

    return this.http.post(url, JSON.stringify({}), {responseType: 'text'});
  }

  retrieveRegistrationRequest() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/sign-up/request/librarian';

    return this.http.get(url, {responseType: 'text'});
  }

  openDialog(content: string, type: string, refresh: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type, refresh: refresh}
    });
  }

}
