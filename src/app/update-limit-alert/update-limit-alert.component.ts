import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateLimitFailedAlertComponent } from '../update-limit-failed-alert/update-limit-failed-alert.component';

@Component({
  selector: 'app-update-limit-alert',
  templateUrl: './update-limit-alert.component.html',
  styleUrls: ['./update-limit-alert.component.scss']
})
export class UpdateLimitAlertComponent implements OnInit {

  currentLimit: number = 0;
  loading = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<UpdateLimitAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.currentLimit = this.data.currentLimit;
  }

  onSubmit(updateLimitForm: NgForm): void {
    if (updateLimitForm.value.newLimit != 0) {
      this.loading = true;
      this.updateVisitLimit(updateLimitForm.value.newLimit).subscribe((data: any) => {
        console.log(data);
        this.loading = false;
        if (JSON.parse(data).status == 'success') {
          this.onDismiss();
          location.reload();
        } else {
          const dialogRef = this.dialog.open(UpdateLimitFailedAlertComponent, {
            width: '390px',
            height: '300px',
          });
        }
      });
    } else {
      const dialogRef = this.dialog.open(UpdateLimitFailedAlertComponent, {
        width: '390px',
        height: '300px',
      });
    }
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

  updateVisitLimit(newLimit: number): any {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/visit/update?' + 'new_limit=' + newLimit;

    let headers = new Headers();

    return this.http.post(url, JSON.stringify({newLimit: newLimit}), {responseType: 'text'});
  }
}
