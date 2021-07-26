import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-ill-details',
  templateUrl: './ill-details.component.html',
  styleUrls: ['./ill-details.component.scss']
})
export class IllDetailsComponent implements OnInit {
  requestId: string = '';
  statusName: string = '';

  name = "";
  tpNumber = "";
  date = "";
  school = "";
  contactNumber = "";
  email = "";
  title = "";
  author = "";
  year = "";
  city = "";
  publisher = "";
  edition = "";
  isbn = "";
  callNumber = "";
  organisation = "";

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<IllDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.requestId = this.data.requestId;
    this.statusName = this.data.statusName;
    this.retrieveIllDetails(this.requestId).subscribe(data => {
      this.name = JSON.parse(data)[0].name;
      this.tpNumber = JSON.parse(data)[0].tpNumber;
      this.date = new Date(JSON.parse(data)[0].date * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).toString();
      this.school = JSON.parse(data)[0].school;
      this.contactNumber = JSON.parse(data)[0].contactNumber;
      this.email = JSON.parse(data)[0].email;
      this.title = JSON.parse(data)[0].title;
      this.author = JSON.parse(data)[0].author;
      this.year = JSON.parse(data)[0].year.toString();
      this.city = JSON.parse(data)[0].city;
      this.publisher = JSON.parse(data)[0].publisher;
      this.edition = JSON.parse(data)[0].edition.toString();
      this.isbn = JSON.parse(data)[0].isbn;
      this.callNumber = JSON.parse(data)[0].callNumber;
      this.organisation = JSON.parse(data)[0].organisation;
    });
  }

  onOKClick() {
    this.dialogRef.close();
  }

  retrieveIllDetails(requestId: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/ill/details/full?'
    + 'request_id=' + requestId;

    return this.http.get(url, {responseType: 'text'});
  }
}
