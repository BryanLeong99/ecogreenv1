import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { Router, ActivatedRoute } from '@angular/router';
import { IllDetailsComponent } from '../ill-details/ill-details.component';

@Component({
  selector: 'app-ill',
  templateUrl: './ill.component.html',
  styleUrls: ['./ill.component.scss']
})
export class IllComponent implements OnInit {
  loading = false;
  result = false;

  height = 80;

  search = "";

  name = "";
  tpNumber = "";
  email = "";
  contactNumber = "";
  userId = "";

  iconMap = new Map([
    ['IS001', 'fact_check'],
    ['IS002', 'done'],
    ['IS003', 'repeat'],
    ['IS004', 'move_to_inbox'],
    ['IS005', 'done_all'],
    ['IS006', 'close']
  ]);

  colorMap = new Map([
    ['IS001', '#2948FF'],
    ['IS002', '#FF43C7'],
    ['IS003', '#440FC0'],
    ['IS004', '#FFBB43'],
    ['IS005', '#28A745'],
    ['IS006', '#FF0000']
  ]);

  illArray: any[] = [];

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', {}),
  });


  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  onUpdate(statusId: string, requestId: string, accept: boolean) {
    this.loading = true;
    let newStatusId: string;
    if (accept) {
      let statusNumber: number = +statusId.substring(2, 5) + 1;
      newStatusId = "IS" + statusNumber.toString().padStart(3, '0');
    } else {
      newStatusId = "IS006";
    }

    this.confirmUpdate(newStatusId, requestId).subscribe(data => {
      console.log(data);
      if (JSON.parse(data).status == 'success') {
        this.openDialog('Updated Successfully;The ILL status has been updated.', 'success', true);
      } else {
        this.openDialog('Unexpected error. Please try again later.', 'fail', false);
      }
    });
  }

  onShowDetails(requestId: string, statusName: string) {
    const dialogRef = this.dialog.open(IllDetailsComponent, {
      width: '500px',
      height: '650px',
      data: {requestId: requestId, statusName: statusName}
    });
  }

  onSearch() {
    let formattedDate;
    this.loading = true;
    this.result = false;
    this.height = 80;

    this.name = "";
    this.tpNumber = "";
    this.email = "";
    this.contactNumber = "";
    this.userId = "";

    this.illArray.splice(0);

    this.retrieveUserDetails(this.searchForm.value.search).subscribe(data => {
      
      if (JSON.parse(data).length != 0) {
        this.name =  JSON.parse(data)[0].name;
        this.tpNumber = JSON.parse(data)[0].tpNumber;
        this.email = JSON.parse(data)[0].email;
        this.contactNumber = JSON.parse(data)[0].contactNumber;
        this.userId = JSON.parse(data)[0].userId;
        this.result = true;

        this.retrieveIllDetails(this.userId).subscribe(data => {
          console.log(data);
          this.loading = false;

          if (JSON.parse(data).length != 0) {
            this.result = true;
            this.search = "";
            this.height = 80 + (10 * JSON.parse(data).length);

            JSON.parse(data).forEach((element: any) => {
              formattedDate = new Date(element.date * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).toString();
              this.illArray.push(
                {
                  "requestId": element.requestId,
                  "color": this.colorMap.get(element.statusId),
                  "icon": this.iconMap.get(element.statusId),
                  "statusName": element.statusName,
                  "title": element.title,
                  "statusId": element.statusId,
                  "date": formattedDate,
                }
              );
            })
          } else {
            this.result = false;
            this.height = 80;
            this.search = "";
            this.openDialog('No Record; No ILL request found.', 'success', false);
          }
        });
      } else {
        this.result = false;
        this.search = "";
        this.loading = false;
        this.openDialog('No Result Found;No result found with the associated TP Number', 'fail', false);
      }
    });
  }

  confirmUpdate(statusId: string, requestId: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/ill/update-status?'
    + 'request_id=' + requestId
    + '&status_id=' + statusId;

    let headers = new Headers();

    return this.http.post(url, JSON.stringify({}), {responseType: 'text'});
  }

  retrieveUserDetails(tpNumber: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/user/details/tp-number?'
    + 'tp_number=' + tpNumber;

    return this.http.get(url, {responseType: 'text'});
  }

  retrieveIllDetails(userId: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/ill/user-id?'
    + 'user_id=' + userId;

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
