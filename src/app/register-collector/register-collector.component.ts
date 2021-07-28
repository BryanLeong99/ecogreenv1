import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthenticateFailedAlertComponent } from '../authenticate-failed-alert/authenticate-failed-alert.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthenticateService } from '../service/authenticate/authenticate.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { HttpClient } from '@angular/common/http';
import { sha256 } from 'js-sha256'

@Component({
  selector: 'app-register-collector',
  templateUrl: './register-collector.component.html',
  styleUrls: ['./register-collector.component.scss']
})
export class RegisterCollectorComponent implements OnInit {

  loading = false;
  image: any;
  imageByte: any;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    defaultPassword: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthenticateService,
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.registerForm.valid || this.image == null) {
      this.openDialog('Invalid Input;Your input is invalid.', 'fail');
    } else {
      this.loading = true;
      this.submitRegistration(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.phoneNumber,
        'Collector',
        this.registerForm.value.address,
        1.0,
        1.0,
        this.registerForm.value.username,
        this.authService.hash(this.registerForm.value.defaultPassword),
        'Available',
      '1.0;1.0;1.0;1.0;1.0;1.0;1.0',
      '15d665e7-41cf-4344-976a-d7a7f5b7accd;aed4d897-de2c-4068-8260-0ebd472f8df4;2cbfbe6c-bcf8-4859-9829-17cb589d862d;4d0aab0a-aa6f-49e9-9fce-a95272d99e44;56af2fbe-4a39-4933-8d62-887711954797;87b4dc32-d75b-4dfc-8d0f-0e94af8cc178;53662e3e-27b5-4e47-b8d4-36c64b0d3aa8'
      );
    }
  }

  uploadImage(event: any): void {
    this.image = event.target.files[0];
  }

  submitRegistration(name: string, email: string, phoneNumber: string, role: string, address: string, longitude: number, latitude: number, username: string, password: string, status: string, chargingRatePerKg: string, itemID: string) {
    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = function() {
      me.imageByte = reader.result;
      let id = me.cookieService.get('id');

      let url = 'https://ecogreen20210725013243.azurewebsites.net/Collector/Create/' + id;

      let headers = {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      };

      let body = {
        'name': name,
        'email': email,
        'phone_number': phoneNumber,
        'role': role,
        'address': address,
        'longitude': longitude,
        'latitude': latitude,
        'username': username,
        'password': password,
        'status': status,
        'charging_rate_per_kg': chargingRatePerKg,
        'item_id': itemID,
        'image': me.imageByte.substring(me.imageByte.indexOf(",") + 1, me.imageByte.Length)
      }

      console.log(id);
      console.log(body);

      me.http.post<any>(url, body, { headers }).subscribe((response: any) => {
        me.loading = false;
        console.log(response);

        if (response.role != '') {
          me.openDialog('Registration Succeeded;The registration is succeeded.',
          'success');
        } else {
          me.openDialog('Duplicate Account;Your username or email has been used in another account.',
        'fail');
        }
      },
      (error: any) => {
        me.loading = false;
        console.log(error);
        me.openDialog('Registration Failed;Your registration is failed.',
        'fail');
      });
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
