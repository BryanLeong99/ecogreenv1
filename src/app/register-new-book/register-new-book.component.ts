import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../subject';
import { Coordinate } from '../coordinate';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RegisterBookItemSuccessAlertComponent } from '../register-book-item-success-alert/register-book-item-success-alert.component';

@Component({
  selector: 'app-register-new-book',
  templateUrl: './register-new-book.component.html',
  styleUrls: ['./register-new-book.component.scss']
})
export class RegisterNewBookComponent implements OnInit {
  ngxLoading = false;

  subjectArray: Subject[] = [];
  coordinateArray: Coordinate[] = [];
  selectedSubjectArray: string[] = [];
  
  registerBookForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    edition: new FormControl('', Validators.required),
    publication: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    physical: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    summary: new FormControl('', {}),
    content: new FormControl('', {}),
    circulation: new FormControl('', Validators.required),
    collection: new FormControl('', Validators.required),
    library: new FormControl('', Validators.required),
    tag: new FormControl('', Validators.required),
    callNumber: new FormControl('', Validators.required),
    coordinate: new FormControl('', Validators.required)
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
    this.retrieveSubjectList().subscribe(data => {
      console.log(data);
      JSON.parse(data).forEach((element: Subject) => {
        let subject: Subject;
        this.subjectArray.push(
          subject = <Subject> {
            subjectId: element.subjectId,
            subjectName: element.subjectName,
          }
        );
      })
    });

    this.retrieveCoordinateList().subscribe(data => {
      console.log(data);
      JSON.parse(data).forEach((element: Coordinate) => {
        let coordinate: Coordinate;
        this.coordinateArray.push(
          coordinate = <Coordinate> {
            coordinateId: element.coordinateId,
            coordinateCode: element.coordinateCode,
          }
        );
      })
    });
  }
  

  onSubmit() {
    if (!this.registerBookForm.valid) {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail');
    } else {
      this.ngxLoading = true;
      this.submitRegistration(
        this.registerBookForm.value.title,
        this.registerBookForm.value.author,
        this.registerBookForm.value.edition,
        this.registerBookForm.value.publication,
        this.registerBookForm.value.year,
        this.registerBookForm.value.isbn,
        this.registerBookForm.value.physical,
        this.selectedSubjectArray.toString(),
        this.registerBookForm.value.image,
        this.registerBookForm.value.summary,
        this.registerBookForm.value.content,
        this.registerBookForm.value.circulation,
        this.registerBookForm.value.collection,
        this.registerBookForm.value.library,
        this.registerBookForm.value.tag,
        this.registerBookForm.value.callNumber,
        this.registerBookForm.value.coordinate
      ).subscribe(data => {
        console.log(data);
        this.ngxLoading = false;
        if (JSON.parse(data).status == 'success') {
          this.openSuccessDialog('TG' + JSON.parse(data).barcode);
        } else {
          this.openDialog('Unexpected error. Please try again later.', 'fail');
        }
      });
    }
  }

  retrieveSubjectList() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/subject/all';

    return this.http.get(url, {responseType: 'text'});
  }

  retrieveCoordinateList() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/coordinate/all';

    return this.http.get(url, {responseType: 'text'});
  }

  submitRegistration(title: string, author: string, edition: string, publication: string, year: string, isbn: string, physical: string, subject: string, image: string, summary: string, content: string, circulation: string, collection: string, library: string, tag: string, callNumber: string, coordinate: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/book/new?'
    + 'title=' + encodeURIComponent(title)
    + '&author=' + encodeURIComponent(author)
    + '&edition=' + edition
    + '&publication=' + encodeURIComponent(publication)
    + '&year=' + year
    + '&isbn=' + isbn
    + '&physical=' + encodeURIComponent(physical)
    + '&subject=' + encodeURIComponent(subject)
    + '&image=' + encodeURIComponent(image)
    + '&summary=' + encodeURIComponent(summary)
    + '&content=' + encodeURIComponent(content)
    + '&circulation=' + circulation
    + '&collection=' + collection
    + '&library=' + library
    + '&tag=' + tag
    + '&call_number=' + encodeURIComponent(callNumber)
    + '&coordinate=' + coordinate;

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

  openSuccessDialog(barcode: string): void {
    const dialogRef = this.dialog.open(RegisterBookItemSuccessAlertComponent, {
      width: '390px',
      height: '470px',
      data: {barcode: barcode}
    });
  }

  getSubjectValue(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.selectedSubjectArray.push(
          event.source.value
        );
      } else {
        this.selectedSubjectArray.splice(this.selectedSubjectArray.indexOf(event.source.value), 1);
      }
    }

    console.log(this.selectedSubjectArray.toString());
  }
}
