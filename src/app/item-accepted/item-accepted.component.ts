import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../subject';
import { Coordinate } from '../coordinate';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-item-accepted',
  templateUrl: './item-accepted.component.html',
  styleUrls: ['./item-accepted.component.scss']
})
export class ItemAcceptedComponent implements OnInit {

  itemForm: FormGroup;

  loading = false;

  itemArray: any[] = [];

  pureItemArray: any[] = [];

  aluminiumPrice = 0.0;
  cardboardPrice = 0.0;
  copperPrice = 0.0;
  glassPrice = 0.0;
  ironPrice = 0.0;
  paperPrice = 0.0;
  plasticPrice = 0.0;

  aluminiumItem = false;
  cardboardItem = false;
  copperItem = false;
  glassItem = false;
  ironItem = false;
  paperItem = false;
  plasticItem = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
    private cookieService: CookieService) {
    this.itemForm = formBuilder.group({
      Aluminium: false,
      Cardboard: false,
      Copper: false,
      Glass: false,
      Iron: false,
      Paper: false,
      Plastic: false,

      aluminiumInput: new FormControl('', {}),
      cardboardInput: new FormControl('', {}),
      copperInput: new FormControl('', {}),
      glassInput: new FormControl('', {}),
      ironInput: new FormControl('', {}),
      paperInput: new FormControl('', {}),
      plasticInput: new FormControl('', {})
    });
  }

  ngOnInit(): void {
    let partitionKey = this.cookieService.get('id');

    this.loading = true;
    this.retrieveItems(partitionKey).subscribe((response: any) => {
      console.log(response);

      this.itemArray = response;

      this.itemArray.forEach(element => {
        if (element.raw_item == "Aluminium") {
          this.aluminiumItem = true;
          this.aluminiumPrice = element.charging_rate_per_kg;
        } else if (element.raw_item == "Cardboard") {
          this.cardboardItem = true;
          this.cardboardPrice = element.charging_rate_per_kg;
        } else if (element.raw_item == "Copper") {
          this.copperItem = true;
          this.copperPrice = element.charging_rate_per_kg;
        } else if (element.raw_item == "Glass") {
          this.glassItem = true;
          this.glassPrice = element.charging_rate_per_kg;
        } else if (element.raw_item == "Iron") {
          this.ironItem = true;
          this.ironPrice = element.charging_rate_per_kg;
        } else if (element.raw_item == "Paper") {
          this.paperItem = true;
          this.paperPrice = element.charging_rate_per_kg;
        } else if (element.raw_item == "Plastic") {
          this.plasticItem = true;
          this.plasticPrice = element.charging_rate_per_kg;
        }
      });

      this.retrieveAllItemID().subscribe((response: any) => {
        console.log(response);
        this.loading = false;

        this.pureItemArray = response;
      }, (error: any) => {
        console.log(error);
        this.loading = false;
      });

    }, (error: any) => {
      console.log(error);
      this.loading = false;
    });


  }

  retrieveAllItemID() {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/Item/All/';

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

  retrieveItems(partitionKey: string) {
    let url = 'https://ecogreen20210725013243.azurewebsites.net/CollectorItem/Items/' + partitionKey;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    return this.http.get(url, {headers: headers});
  }

  onSubmit() {
    console.log(this.itemForm.value);

    let updatedItemArray: any[] = [];

    updatedItemArray.push(
      {
        'raw_item':'Aluminium',
        'charging_rate_per_kg': this.itemForm.value.aluminiumInput,
        'exists': this.itemForm.value.Aluminium,
        'item_id': this.pureItemArray[0].id,
      },
      {
        'raw_item': 'Cardboard',
        'charging_rate_per_kg': this.itemForm.value.cardboardInput,
        'exists': this.itemForm.value.Cardboard,
        'item_id': this.pureItemArray[1].id,
      },
      {
        'raw_item': 'Copper',
        'charging_rate_per_kg': this.itemForm.value.copperInput,
        'exists': this.itemForm.value.Copper,
        'item_id': this.pureItemArray[2].id,
      },
      {
        'raw_item': 'Glass',
        'charging_rate_per_kg': this.itemForm.value.glassInput,
        'exists': this.itemForm.value.Glass,
        'item_id': this.pureItemArray[3].id,
      },
      {
        'raw_item': 'Iron',
        'charging_rate_per_kg': this.itemForm.value.ironInput,
        'exists': this.itemForm.value.Iron,
        'item_id': this.pureItemArray[4].id,
      },
      {
        'raw_item': 'Paper',
        'charging_rate_per_kg': this.itemForm.value.paperInput,
        'exists': this.itemForm.value.Paper,
        'item_id': this.pureItemArray[5].id,
      },
      {
        'raw_item': 'Plastic',
        'charging_rate_per_kg': this.itemForm.value.plasticInput,
        'exists': this.itemForm.value.Plastic,
        'item_id': this.pureItemArray[6].id,
      },
    );

    console.log(updatedItemArray);

      let collectorID = this.cookieService.get('id');

    let url = 'https://ecogreen20210725013243.azurewebsites.net/CollectorItem/Update/' + collectorID;

    let headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };

    let body = updatedItemArray;

    this.loading = true;

    this.http.post<any>(url, body, { headers }).subscribe((response: any) => {
      console.log(response);
      this.loading = false;

      this.openDialog('Updated;Updated successfully.', 'success', false);

    }, (error: any) => {
      console.log(error);
      this.loading = false;
      this.openDialog('Error;Unexpected error.', 'fail', false);
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
