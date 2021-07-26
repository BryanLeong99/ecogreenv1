import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Subject } from '../subject';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { Coordinate } from '../coordinate';
import { RegisterBookItemSuccessAlertComponent } from '../register-book-item-success-alert/register-book-item-success-alert.component';
import { ShowBarcodeAlertComponent } from '../show-barcode-alert/show-barcode-alert.component';

@Component({
  selector: 'app-register-new-item',
  templateUrl: './register-new-item.component.html',
  styleUrls: ['./register-new-item.component.scss']
})
export class RegisterNewItemComponent implements OnInit {
  loading = false;
  result = false;

  title = "";
  author = "";
  edition = "";
  publication = "";
  isbn = "";
  physical = ""
  subjectArray: string[] = []
  subject = "";
  image = ""
  bookId = ""
  coordinate = "";
  callNumber = "";
  barcode = "";

  search = "";

  height = 128;

  coordinateArray: Coordinate[] = [];

  registerItemForm: FormGroup = new FormGroup({
    circulation: new FormControl('', Validators.required),
    collection: new FormControl('', Validators.required),
    library: new FormControl('', Validators.required),
    tag: new FormControl('', Validators.required),
    callNumber: new FormControl('', Validators.required),
    coordinate: new FormControl('', Validators.required),
    copy: new FormControl('', Validators.required),
  });

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', {}),
  });

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
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

  onShowCode(barcode: string) {
    const dialogRef = this.dialog.open(ShowBarcodeAlertComponent, {
      width: '390px',
      height: '400px',
      data: {barcode: 'TG' + barcode}
    });
  }

  onSubmit() {
    if (!this.registerItemForm.valid || !this.result) {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail');
    } else {
      this.loading = true;
      this.submitRegistration(
        this.bookId,
        this.registerItemForm.value.circulation,
        this.registerItemForm.value.collection,
        this.registerItemForm.value.library,
        this.registerItemForm.value.tag,
        this.registerItemForm.value.callNumber,
        this.registerItemForm.value.coordinate,
        this.registerItemForm.value.copy
      ).subscribe(data => {
        console.log(data);
        this.loading = false;
        if (JSON.parse(data).status == 'success') {
          this.openSuccessDialog('TG' + JSON.parse(data).barcode);
        } else {
          this.openDialog('Unexpected error. Please try again later.', 'fail');
        }
      });
    }
  }

  onChange(searchString: string) {
    if (this.searchForm.value.search.length == 8) {
      this.subjectArray.splice(0);
      this.loading = true;
      this.result = false;
      this.height = 128;
      this.retrieveBookDetails(this.searchForm.value.search).subscribe(data => {
        console.log(data);
        this.loading = false;
        if (JSON.parse(data).bookData.length != 0) {
          this.result = true;
          this.search = "";
          this.height = 168;

          this.title = JSON.parse(data).bookData[0].title;
          this.author = JSON.parse(data).bookData[0].author;
          this.edition = JSON.parse(data).bookData[0].edition.toString();
          this.publication = JSON.parse(data).bookData[0].publication;
          this.isbn = JSON.parse(data).bookData[0].isbn;
          this.physical = JSON.parse(data).bookData[0].physical;
          this.bookId = JSON.parse(data).bookData[0].bookId;
          this.image = JSON.parse(data).bookData[0].image
          this.coordinate = JSON.parse(data).bookData[0].coordinate;
          this.callNumber = JSON.parse(data).bookData[0].callNumber;
          this.barcode = JSON.parse(data).bookData[0].barcode;
          JSON.parse(data).subjectData.forEach((element: any) => {
            this.subjectArray.push(
              element.subjectName.toString()
            );  
          });
          this.subject = this.subjectArray.toString();
        } else {
          this.search = "";
          this.result = false;
          this.height = 128;
          this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
        }
      });
    }
  }

  onSearch() {
    if (this.searchForm.value.search.length == 8) {
      this.subjectArray.splice(0);
      this.loading = true;
      this.result = false;
      this.height = 128;
      this.retrieveBookDetails(this.searchForm.value.search).subscribe(data => {
        console.log(data);
        this.loading = false;
        if (JSON.parse(data).bookData.length != 0) {
          this.result = true;
          this.height = 168;
          this.search = "";

          this.title = JSON.parse(data).bookData[0].title;
          this.author = JSON.parse(data).bookData[0].author;
          this.edition = JSON.parse(data).bookData[0].edition.toString();
          this.publication = JSON.parse(data).bookData[0].publication;
          this.isbn = JSON.parse(data).bookData[0].isbn;
          this.physical = JSON.parse(data).bookData[0].physical;
          this.bookId = JSON.parse(data).bookData[0].bookId;
          this.image = JSON.parse(data).bookData[0].image
          this.coordinate = JSON.parse(data).bookData[0].coordinate;
          this.callNumber = JSON.parse(data).bookData[0].callNumber;
          this.barcode = JSON.parse(data).bookData[0].barcode;
          JSON.parse(data).subjectData.forEach((element: any) => {
            this.subjectArray.push(
              element.subjectName.toString()
            );  
          });
          this.subject = this.subjectArray.toString();
        } else {
          this.result = false;
          this.search = "";
          this.height = 128;
          this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
        }
      });
    } else {
      this.search = "";
      this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
    }
  }

  retrieveBookDetails(barcode: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/book/details/code?'
    + 'barcode=' + encodeURIComponent(barcode);

    return this.http.get(url, {responseType: 'text'});
  }

  retrieveCoordinateList() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/coordinate/all';

    return this.http.get(url, {responseType: 'text'});
  }

  submitRegistration(
    bookId: string, circulation: string, collection: string, library: string, tag: string, callNumber: string, coordinate: string, copy: string
  ) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/item/new?'
    + 'book_id=' + bookId
    + '&circulation=' + circulation
    + '&collection=' + collection
    + '&library=' + library
    + '&tag=' + tag
    + '&call_number=' + encodeURIComponent(callNumber)
    + '&coordinate=' + coordinate
    + '&copy=' + copy;

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
}
