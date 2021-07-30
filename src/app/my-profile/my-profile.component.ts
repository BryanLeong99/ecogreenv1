import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../subject';
import { Coordinate } from '../coordinate';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthenticateService } from '../service/authenticate/authenticate.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  loading = false;

  name = "";
  email = "";
  address = "";
  latitude = 0.0;
  longitude = 0.0;
  phoneNumber = "";
  tempPassword = "";
  imageURL = "";

  profileForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    address: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    existingPassword: new FormControl('', {}),
    newPassword: new FormControl('', {}),
  });

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private authService: AuthenticateService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.retrieveProfileDetails().subscribe((response: any) => {
      console.log(response);
      this.loading = false;

      this.name = response.name;
      this.email = response.email;
      this.address = response.address;
      this.latitude = response.latitude;
      this.longitude = response.longitude;
      this.phoneNumber = response.phone_number;
      this.tempPassword = response.password;
      this.imageURL = response.image_url;
    }, (error: any) => {
      console.log(error);
      this.loading = false;
    });
  }

  retrieveProfileDetails() {
    let id = this.cookieService.get('id');
    let url = 'https://ecogreen20210725013243.azurewebsites.net/User/Profile/' + id;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      this.openDialog('Invalid Input;The input is invalid.', 'fail', false);
    } else {
      if (this.profileForm.value.existingPassword != '' && this.profileForm.value.newPassword != '') {
        if (this.authService.hash(this.profileForm.value.existingPassword) == this.tempPassword) {
          this.updateProfile(this.authService.hash(this.profileForm.value.newPassword));
        } else {
          this.openDialog('Incorrect Password;Existing password is incorrect.', 'fail', false);
        }
      } else {
        this.updateProfile(this.tempPassword);
      }
    }
  }

  updateProfile(password: string) {
    let id = this.cookieService.get('id');
      let url = 'https://ecogreen20210725013243.azurewebsites.net/User/Profile/Update';

      let headers = {
        'accept': 'text/plain'
      };

      let body = {
        'id': id,
        'name': this.name,
        'email': this.email,
        'address': this.address,
        'latitude': this.latitude,
        'longitude': this.longitude,
        'password': password,
        'phone_number': this.phoneNumber
      }

      this.loading = true;
      this.http.patch(url, body, { headers: headers }).subscribe((response: any) => {
        console.log(response);
        this.loading = false;

        this.openDialog('Profile Updated;Profile is updated successfully.', 'success', false);

        this.retrieveProfileDetails().subscribe((response: any) => {
          console.log(response);

          this.name = response.name;
          this.email = response.email;
          this.address = response.address;
          this.latitude = response.latitude;
          this.longitude = response.longitude;
          this.phoneNumber = response.phone_number;
        }, (error: any) => {
          console.log(error);
        });
      }), (error: any) => {
        console.log(error);
        this.loading = false;

        this.openDialog('Error;Unexpected error.', 'fail', false);
      };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  openDialog(content: string, type: string, refresh: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type, refresh: refresh}
    });
  }
}
