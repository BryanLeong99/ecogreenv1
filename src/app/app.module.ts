import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticateFailedAlertComponent } from './authenticate-failed-alert/authenticate-failed-alert.component';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { JSEncrypt } from 'jsencrypt';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { CustomAlertComponent } from './custom-alert/custom-alert.component';

import {MatSelectModule} from '@angular/material/select';
import { NgxBarcodeModule } from 'ngx-barcode';

import { CreateBookingComponent } from './create-booking/create-booking.component';
import { CreateBookingAlertComponent } from './create-booking-alert/create-booking-alert.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { RecyclingCentreComponent } from './recycling-centre/recycling-centre.component';
import { BookingRequestComponent } from './booking-request/booking-request.component';
import { PaymentAlertComponent } from './payment-alert/payment-alert.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ItemAcceptedComponent } from './item-accepted/item-accepted.component';
import { RegisterCollectorComponent } from './register-collector/register-collector.component';
import { PayToCollectorComponent } from './pay-to-collector/pay-to-collector.component';
import { MyRatingComponent } from './my-rating/my-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SignInComponent,
    AuthenticateFailedAlertComponent,
    DashboardComponent,
    CustomAlertComponent,
    CreateBookingComponent,
    CreateBookingAlertComponent,
    MyBookingComponent,
    TransactionHistoryComponent,
    RecyclingCentreComponent,
    BookingRequestComponent,
    PaymentAlertComponent,
    CashOutComponent,
    MyProfileComponent,
    ItemAcceptedComponent,
    RegisterCollectorComponent,
    PayToCollectorComponent,
    MyRatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
    }),
    ChartsModule,
    NgCircleProgressModule.forRoot({
      radius: 150,
      outerStrokeWidth: 25,
      innerStrokeWidth: 10,
      space: -10,
      outerStrokeColor: "white",
      innerStrokeColor: "transparent",
      animationDuration: 200,
      lazy: false,
      startFromZero: true,
    }),
    NgxBarcodeModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
