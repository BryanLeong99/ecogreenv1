import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from '../subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';

@Component({
  selector: 'app-modify-book-details',
  templateUrl: './modify-book-details.component.html',
  styleUrls: ['./modify-book-details.component.scss']
})
export class ModifyBookDetailsComponent implements OnInit {
  loading = false;

  bookId = "";
  title = "";
  author = "";
  edition = "";
  publication = "";
  isbn = "";
  physical = "";
  year = "";
  image = "";
  summary = "";
  content = "";

  search = "";

  subjectArray: Subject[] = [];
  selectedSubjectArray: string[] = [];

  modifyBookForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    edition: new FormControl('', Validators.required),
    publication: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    physical: new FormControl('', Validators.required),
    subject: new FormControl('', {}),
    image: new FormControl('', Validators.required),
    summary: new FormControl('', {}),
    content: new FormControl('', {}),
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

  onSubmit() {
    if (!this.modifyBookForm.valid || this.bookId == "") {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail');
    } else {
      this.loading = true;
      this.confirmUpdate(
        this.modifyBookForm.value.title,
        this.modifyBookForm.value.author,
        this.modifyBookForm.value.edition,
        this.modifyBookForm.value.publication,
        this.modifyBookForm.value.year,
        this.modifyBookForm.value.isbn,
        this.modifyBookForm.value.physical,
        this.selectedSubjectArray.toString(),
        this.modifyBookForm.value.image,
        this.modifyBookForm.value.summary,
        this.modifyBookForm.value.content,
        this.bookId
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

  onSearch() {
    if (this.searchForm.value.search.length == 8) {
      this.subjectArray.splice(0);
      this.selectedSubjectArray.splice(0);
      this.loading = true;
      this.retrieveBookDetails(this.searchForm.value.search).subscribe(data => {
        console.log(data);
        
        if (JSON.parse(data).bookData.length != 0) {
          this.search = "";
          this.title = JSON.parse(data).bookData[0].title;
          this.author = JSON.parse(data).bookData[0].author;
          this.edition = JSON.parse(data).bookData[0].edition.toString();
          this.publication = JSON.parse(data).bookData[0].publication;
          this.isbn = JSON.parse(data).bookData[0].isbn;
          this.physical = JSON.parse(data).bookData[0].physical;
          this.bookId = JSON.parse(data).bookData[0].bookId;
          this.year = JSON.parse(data).bookData[0].year;
          this.image = JSON.parse(data).bookData[0].image
          this.summary = JSON.parse(data).bookData[0].summary;
          this.content = JSON.parse(data).bookData[0].content;

          JSON.parse(data).subjectData.forEach((element: any) => {
            this.selectedSubjectArray.push(
              element.subjectId
            );
          });

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
        } else {
          this.search = "";
          this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
        }
      });
    } else {
      this.search = "";
      this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
    }
  }

  onChange(searchString: string) {
    if (this.searchForm.value.search.length == 8) {
      this.subjectArray.splice(0);
      this.selectedSubjectArray.splice(0);
      this.loading = true;
      this.retrieveBookDetails(this.searchForm.value.search).subscribe(data => {
        console.log(data);
        this.loading = false;
        if (JSON.parse(data).bookData.length != 0) {
          this.search = "";
          this.title = JSON.parse(data).bookData[0].title;
          this.author = JSON.parse(data).bookData[0].author;
          this.edition = JSON.parse(data).bookData[0].edition.toString();
          this.publication = JSON.parse(data).bookData[0].publication;
          this.isbn = JSON.parse(data).bookData[0].isbn;
          this.physical = JSON.parse(data).bookData[0].physical;
          this.bookId = JSON.parse(data).bookData[0].bookId;
          this.year = JSON.parse(data).bookData[0].year;
          this.image = JSON.parse(data).bookData[0].image
          this.summary = JSON.parse(data).bookData[0].summary;
          this.content = JSON.parse(data).bookData[0].content;
          JSON.parse(data).subjectData.forEach((element: any) => {
            this.selectedSubjectArray.push(
              element.subjectId
            );
          });

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
        } else {
          this.search = "";
          this.openDialog('No Result Found;No result found with the associated barcode', 'fail');
        }
      });
    }
  }

  retrieveSubjectList() {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/subject/all';

    return this.http.get(url, {responseType: 'text'});
  }

  retrieveBookDetails(barcode: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/book/details/code?'
    + 'barcode=' + encodeURIComponent(barcode);

    return this.http.get(url, {responseType: 'text'});
  }

  confirmUpdate(title: string, author: string, edition: string, publication: string, year: string, isbn: string, physical: string, subject: string, image: string, summary: string, content: string, bookId: string) {
    let url = 'https://zj9ohmm9uh.execute-api.us-east-1.amazonaws.com/dev/book/modify?'
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
    + '&book_id=' + bookId;

    let headers = new Headers();

    return this.http.post(url, JSON.stringify({}), {responseType: 'text'});
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

  openDialog(content: string, type: string): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type}
    });
  }
}
