import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { PayFineConfirmationAlertComponent } from '../pay-fine-confirmation-alert/pay-fine-confirmation-alert.component';

@Component({
  selector: 'app-pay-fine',
  templateUrl: './pay-fine.component.html',
  styleUrls: ['./pay-fine.component.scss']
})
export class PayFineComponent implements OnInit {
  loading = false;
  result = false;

  height = 80;

  search = "";

  name = "";
  tpNumber = "";
  email = "";
  contactNumber = "";
  userId = "";

  amount = 0;

  fineArray: any[] = [];
  fineRecordIdArray: string[] = [];

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', {}),
  });

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
    this.loading = true;
    this.result = false;
    this.height = 80;

    this.amount = 0;
    this.fineArray.splice(0);
    this.name = "";
    this.tpNumber = "";
    this.email = "";
    this.contactNumber = "";
    this.userId = "";

    this.retrieveUserDetails(this.searchForm.value.search).subscribe(data => {
      console.log(data);

      if (JSON.parse(data).length != 0) {
        this.name =  JSON.parse(data)[0].name;
        this.tpNumber = JSON.parse(data)[0].tpNumber;
        this.email = JSON.parse(data)[0].email;
        this.contactNumber = JSON.parse(data)[0].contactNumber;
        this.userId = JSON.parse(data)[0].userId;
        
        this.retrieveFineDetails(this.searchForm.value.search).subscribe(data => {
          console.log(data);
          this.loading = false;

          if (JSON.parse(data).length != 0) {
            this.result = true;
            this.search = "";
            this.height = 80 + (11 * JSON.parse(data).length);

            this.calculateFineTotal(JSON.parse(data));
          } else {
            this.result = false;
            this.height = 80;
            this.search = "";
            this.openDialog('No Outstanding; The user has no outstanding fine to be paid.', 'success');
          }
        });
      } else {
        this.loading = false;
        this.search = "";
        this.openDialog('No Result Found;No result found with the associated TP Number', 'fail');
      }
    });
  }

  calculateFineTotal(fineArray: any[]) {
    let formattedDate;
    fineArray.forEach(
      (element: any) => {
        this.amount += element.amount;
        formattedDate = new Date(element.date * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }).toString();
        this.fineArray.push(
          {
            "title": element.title,
            "amount": element.amount,
            "date": formattedDate,
          }
        );
        this.fineRecordIdArray.push(
          element.fineRecordId
        );
      }
    );
  }

  onPay() {
    if (this.userId == "") {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail');
    } else {
      this.openConfirmationDialog(this.amount, this.fineRecordIdArray.toString());
    }
  }

  retrieveUserDetails(tpNumber: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/user/details/tp-number?'
    + 'tp_number=' + tpNumber;

    return this.http.get(url, {responseType: 'text'});
  }

  retrieveFineDetails(tpNumber: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/fine-history/tp-number?'
    + 'tp_number=' + tpNumber;

    return this.http.get(url, {responseType: 'text'});
  }

  openDialog(content: string, type: string): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type}
    });
  }

  openConfirmationDialog(amount: number, fineRecordId: string) {
    const dialogRef = this.dialog.open(PayFineConfirmationAlertComponent, {
      width: '390px',
      height: '340px',
      data: {amount: amount, fineRecordId: fineRecordId}
    });
  }
}
