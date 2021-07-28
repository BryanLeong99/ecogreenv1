import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../subject';
import { Coordinate } from '../coordinate';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-pay-to-collector',
  templateUrl: './pay-to-collector.component.html',
  styleUrls: ['./pay-to-collector.component.scss']
})
export class PayToCollectorComponent implements OnInit {

  paymentForm: FormGroup = new FormGroup({
    aluminiumInput: new FormControl('', {}),
    cardboardInput: new FormControl('', {}),
    copperInput: new FormControl('', {}),
    glassInput: new FormControl('', {}),
    ironInput: new FormControl('', {}),
    paperInput: new FormControl('', {}),
    plasticInput: new FormControl('', {}),
    emailInput: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });

  aluminiumMass = 0.0;
  cardboardMass = 0.0;
  copperMass = 0.0;
  glassMass = 0.0;
  ironMass = 0.0;
  paperMass = 0.0;
  plasticMass = 0.0;

  aluminiumPrice = this.aluminiumMass * 15;
  cardboardPrice = this.cardboardMass * 5;
  copperPrice = this.copperMass * 13;
  glassPrice = this.glassMass * 6;
  ironPrice = this.ironMass * 9;
  paperPrice = this.paperMass * 4;
  plasticPrice = this.plasticMass * 5;

  total = 0.0;

  loading = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let priceOfItems = 'Aluminium;' + this.paymentForm.value.aluminiumInput * 15
    + ';Cardboard;' + this.paymentForm.value.cardboardInput * 5
    + ';Copper;' + this.paymentForm.value.copperInput * 13
    + ';Glass;' + this.paymentForm.value.glassInput * 6
    + ';Iron;' + this.paymentForm.value.ironInput * 9
    + ';Paper;' + this.paymentForm.value.paperInput * 4
    + ';Plastic;' + this.paymentForm.value.plasticInput * 5;

    let payerID = this.cookieService.get('id');
    let payerName = this.cookieService.get('name');

    this.loading = true;
    this.createTransaction(this.paymentForm.value.emailInput, payerID, payerName, priceOfItems).subscribe((response: any) => {
      console.log(response);
      this.loading = false;

      this.openDialog('Payment Recorded;Payment has been recorded successfully.', 'success', false);
    }, (error: any) => {
      console.log(error);
      this.loading = false;

      this.openDialog('Error;Email not found.', 'fail', false);
    });
  }

  calculatePrice() {
    this.total =  this.aluminiumMass * 15 +  this.cardboardMass * 5 + this.copperMass * 13 + this.glassMass * 6 + this.ironMass * 9 + this.paperMass * 4 + this.plasticMass * 5;
  }

  openDialog(content: string, type: string, refresh: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '390px',
      height: '300px',
      data: {content: content, type: type, refresh: refresh}
    });
  }

  createTransaction(email: string, payerID: string, payerName: string, priceOfItems: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Payment/Create/Centre/' + email;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    let body = {
      'payer_id': payerID,
      'payer_name': payerName,
      'price_of_items': priceOfItems
    }

    return this.http.post<any>(url, body, { headers });
  }


}
