import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Coordinate } from '../coordinate';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { ShowBarcodeAlertComponent } from '../show-barcode-alert/show-barcode-alert.component';

@Component({
  selector: 'app-modify-item-details',
  templateUrl: './modify-item-details.component.html',
  styleUrls: ['./modify-item-details.component.scss']
})
export class ModifyItemDetailsComponent implements OnInit {
  loading = false;
  result = false;

  title = "";
  author = "";
  edition = "";
  publication = "";
  isbn = "";
  physical = "";
  subjectArray: string[] = [];
  subject = "";
  image = "";
  bookId = "";
  itemId = "";
  coordinate = "";
  callNumber = "";
  copy = "";
  barcode = "";

  circulation = "";
  collection = "";
  library = "";
  tag = "";
  availability = "";

  height = 140;

  search = "";

  coordinateArray: Coordinate[] = [];

  circulationArray: any = [];
  collectionArray: any = [];
  libraryArray: any = [];
  tagArray: any = [];
  availabilityArray: any = [];

  modifyItemForm: FormGroup = new FormGroup({
    circulation: new FormControl('', Validators.required),
    collection: new FormControl('', Validators.required),
    library: new FormControl('', Validators.required),
    tag: new FormControl('', Validators.required),
    callNumber: new FormControl('', Validators.required),
    coordinate: new FormControl('', Validators.required),
    copy: new FormControl('', Validators.required),
    availability: new FormControl('', Validators.required),
  });

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', {}),
  });

  constructor(
    private http: HttpClient,
    public dialog: MatDialog, 
  ) { }

  ngOnInit(): void {

  }

  onShowCode(barcode: string) {
    const dialogRef = this.dialog.open(ShowBarcodeAlertComponent, {
      width: '390px',
      height: '400px',
      data: {barcode: 'TG' + barcode}
    });
  }

  confirmUpdate(
    itemId: string, circulation: string, collection: string, library: string, tag: string, callNumber: string, coordinate: string, copy: string, availability: string
  ) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/item/modify?'
    + 'item_id=' + itemId
    + '&circulation=' + circulation
    + '&collection=' + collection
    + '&library=' + library
    + '&tag=' + tag
    + '&call_number=' + encodeURIComponent(callNumber)
    + '&coordinate=' + coordinate
    + '&copy=' + copy
    + '&availability=' + availability;

    let headers = new Headers();

    return this.http.post(url, JSON.stringify({}), {responseType: 'text'});
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

  onSubmit() {
    if (!this.modifyItemForm.valid || this.bookId == "") {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail');
    } else {
      this.loading = true;
      this.confirmUpdate(
        this.itemId,
        this.modifyItemForm.value.circulation,
        this.modifyItemForm.value.collection,
        this.modifyItemForm.value.library,
        this.modifyItemForm.value.tag,
        this.modifyItemForm.value.callNumber,
        this.modifyItemForm.value.coordinate,
        this.modifyItemForm.value.copy,
        this.modifyItemForm.value.availability,
      ).subscribe(data => {
        console.log(data)
        this.loading = false;
        if (JSON.parse(data).status == 'success') {
          this.openDialog('Updated Successfully;Book details are updated successfully.', 'success');
        } else {
          this.openDialog('Unexpected error. Please try again later.', 'fail');
        }
      });
    }
  }

  onChange(searchString: string) {
    if (this.searchForm.value.search.length == 8) {
      this.circulationArray.splice(0);
      this.collectionArray.splice(0);
      this.libraryArray.splice(0);
      this.tagArray.splice(0);
      this.coordinateArray.splice(0);
      this.subjectArray.splice(0);

      this.loading = true;
      this.result = false;
      this.height = 140;
      this.retrieveBookDetails(this.searchForm.value.search).subscribe(data => {
        console.log(data);
        this.loading = false;
        if (JSON.parse(data).bookData.length != 0) {
          this.result = true;
          this.search = "";
          this.height = 185;

          this.title = JSON.parse(data).bookData[0].title;
          this.author = JSON.parse(data).bookData[0].author;
          this.edition = JSON.parse(data).bookData[0].edition.toString();
          this.publication = JSON.parse(data).bookData[0].publication;
          this.isbn = JSON.parse(data).bookData[0].isbn;
          this.physical = JSON.parse(data).bookData[0].physical;
          this.bookId = JSON.parse(data).bookData[0].bookId;
          this.itemId = JSON.parse(data).bookData[0].itemId;
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
          this.copy = JSON.parse(data).bookData[0].copyNumber.toString();
          this.circulation = JSON.parse(data).bookData[0].circulationId;
          this.collection = JSON.parse(data).bookData[0].collectionId;
          this.library = JSON.parse(data).bookData[0].libraryId;
          this.tag = JSON.parse(data).bookData[0].tagId;
          this.coordinate = JSON.parse(data).bookData[0].coordinateId;
          this.availability = JSON.parse(data).bookData[0].availability;

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

          this.circulationArray = [
            { "value": "CR001", "name": "General Circulation" },
            { "value": "CR002", "name": "Staff Circulation" },
            { "value": "CR003", "name": "Overnight Loan" },
          ];

          this.collectionArray = [
            { "value": "CL001", "name": "Print Book" },
            { "value": "CL002", "name": "eBook" },
          ];

          this.libraryArray = [
            { "value": "LB001", "name": "APU" },
            { "value": "LB002", "name": "APIIT" },
          ];

          this.tagArray = [
            { "value": "TG01", "name": "Open" },
            { "value": "TG02", "name": "Yellow" },
            { "value": "TG03", "name": "Red" },
            { "value": "TG04", "name": "Green" },
          ];

          this.availabilityArray = [
            { "value": "AS001", "name": "Available" },
            { "value": "AS002", "name": "Loaned" },
            { "value": "AS003", "name": "Lost" },
          ];
        } else {
          this.search = "";
          this.result = false;
          this.height = 140;
          this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
        }
      });
    }
  }

  onSearch() {
    if (this.searchForm.value.search.length == 8) {
      this.circulationArray.splice(0);
      this.collectionArray.splice(0);
      this.libraryArray.splice(0);
      this.tagArray.splice(0);
      this.coordinateArray.splice(0);
      this.subjectArray.splice(0);

      this.loading = true;
      this.result = false;
      this.height = 140;
      this.retrieveBookDetails(this.searchForm.value.search).subscribe(data => {
        console.log(data);
        this.loading = false;
        if (JSON.parse(data).bookData.length != 0) {
          this.result = true;
          this.height = 185;
          this.search = "";

          this.title = JSON.parse(data).bookData[0].title;
          this.author = JSON.parse(data).bookData[0].author;
          this.edition = JSON.parse(data).bookData[0].edition.toString();
          this.publication = JSON.parse(data).bookData[0].publication;
          this.isbn = JSON.parse(data).bookData[0].isbn;
          this.physical = JSON.parse(data).bookData[0].physical;
          this.bookId = JSON.parse(data).bookData[0].bookId;
          this.itemId = JSON.parse(data).bookData[0].itemId;
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
          this.copy = JSON.parse(data).bookData[0].copyNumber.toString();
          this.circulation = JSON.parse(data).bookData[0].circulationId;
          this.collection = JSON.parse(data).bookData[0].collectionId;
          this.library = JSON.parse(data).bookData[0].libraryId;
          this.tag = JSON.parse(data).bookData[0].tagId;
          this.coordinate = JSON.parse(data).bookData[0].coordinateId;

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

          this.circulationArray = [
            { "value": "CR001", "name": "General Circulation" },
            { "value": "CR002", "name": "Staff Circulation" },
            { "value": "CR003", "name": "Overnight Loan" },
          ];

          this.collectionArray = [
            { "value": "CL001", "name": "Print Book" },
            { "value": "CL002", "name": "eBook" },
          ];

          this.libraryArray = [
            { "value": "LB001", "name": "APU" },
            { "value": "LB002", "name": "APIIT" },
          ];

          this.availabilityArray = [
            { "value": "AS001", "name": "Available" },
            { "value": "AS002", "name": "Loaned" },
            { "value": "AS003", "name": "Lost" },
          ];
        } else {
          this.result = false;
          this.search = "";
          this.height = 140;
          this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
        }
      });
    } else {
      this.search = "";
      this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
    }
  }

  openDialog(content: string, type: string): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type}
    });
  }
}
