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
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  // signInFormControl = new FormControl('');
  // signInFormGroup = this.formBuilder.group({
  //   username: '',
  //   password: '',
  // });

  public loading = false;
  public registerForm = false;
  public image: any;
  public latitude: number = 0.0;
  public longitude: number = 0.0;
  public imageByte: any;

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', {}),
    password: new FormControl('', {})
  });

  registerUserForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
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
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Got position", position.coords);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  onSubmit(): void {
    this.loading = true;

    this.authService.authenticate(this.signInForm.value.username, this.signInForm.value.password).subscribe((response: any) => {
      this.loading = false;
      console.log(response);

      if (response.role != '') {
        this.cookieService.set('id', response.id);
        this.cookieService.set('role', response.role);
        this.cookieService.set('name', response.name);
        sessionStorage.setItem('page', 'dashboard');
        // this.router.navigateByUrl('/' ).then(()=>
        // this.router.navigate(['/']));

        // let currentUrl = this.router.url;
        // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        //   this.router.navigate(['/']);
        //   console.log(currentUrl);
        // });
        // window.location.href = currentUrl;

        this.router.navigate(['/']);
        // location.reload();

        sessionStorage.setItem('navigate', 'true');
        sessionStorage.setItem('first', 'true');
      } else {
        this.openDialog();
      }

    }, (error: any) => {
      this.loading = false;
      this.openDialog();
    });
    // false
  }

  onRegister() {
    if (!this.registerUserForm.valid || this.image == null || this.longitude == 0.0
      || this.latitude == 0.0) {
      this.openDialog2('Invalid Input;Your input is invalid.', 'fail');
    } else {
      this.loading = true;
      this.submitRegistration(this.registerUserForm.value.name,
        this.registerUserForm.value.email,
        this.registerUserForm.value.phoneNumber,
        this.registerUserForm.value.address,
        this.registerUserForm.value.username,
        this.registerUserForm.value.password,
        this.image);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthenticateFailedAlertComponent, {
      width: '390px',
      height: '300px'
      // data: {name: this.name, animal: this.animal}
    });
  }

  uploadImage(event: any): void {
    this.image = event.target.files[0];
  }

  // submit registration
  submitRegistration(name: string, email: string, phoneNumber: string, address: string, username: string, password: string, image: any) {
    console.log(this.image);
    let me = this;
    let reader = new FileReader();

    // convert image to a string of bytes
    reader.readAsDataURL(this.image);
    reader.onload = function() {
      me.imageByte = reader.result;
      let url = 'https://ecogreen20210725013243.azurewebsites.net/User/Create';

      let headers = {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      };

      let body = {
        'name': me.registerUserForm.value.name,
        'email': me.registerUserForm.value.email,
        'phone_number': me.registerUserForm.value.phoneNumber,
        'role': 'Household',
        'address': me.registerUserForm.value.address,
        'longitude': me.longitude,
        'latitude': me.latitude,
        'username': me.registerUserForm.value.username,
        'password': sha256(me.registerUserForm.value.password),
        'image': me.imageByte.substring(me.imageByte.indexOf(",") + 1, me.imageByte.Length)
      }

      // call post API and process based on the response
      me.http.post<any>(url, body, { headers }).subscribe((response: any) => {
        me.loading = false;
        console.log(response);

        if (response.role != '') {
          me.openDialog2('Registration Succeeded;Your registration is succeeded.',
          'success');
          me.registerForm = !me.registerForm;
        } else {
          me.openDialog2('Duplicate Account;Your username or email has been used in another account.',
        'fail');
        }
      },
      (error: any) => {
        me.loading = false;
        console.log(error);
        me.openDialog2('Registration Failed;Your registration is failed.',
        'fail');
      });
    }
  }

  showRegisterForm(): void {
    this.registerForm = !this.registerForm;
    console.log(this.registerForm);
  }

  openDialog2(content: string, type: string): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type}
    });
  }

}
