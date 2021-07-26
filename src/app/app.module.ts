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
import { UpdateLimitAlertComponent } from './update-limit-alert/update-limit-alert.component';
import { UpdateLimitFailedAlertComponent } from './update-limit-failed-alert/update-limit-failed-alert.component';
import { DiscussionRoomBookingComponent } from './discussion-room-booking/discussion-room-booking.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { RegisterNewBookComponent } from './register-new-book/register-new-book.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxBarcodeModule } from 'ngx-barcode';
import { RegisterBookItemSuccessAlertComponent } from './register-book-item-success-alert/register-book-item-success-alert.component';
import { RegisterNewItemComponent } from './register-new-item/register-new-item.component';
import { ModifyBookDetailsComponent } from './modify-book-details/modify-book-details.component';
import { ModifyItemDetailsComponent } from './modify-item-details/modify-item-details.component';
import { PayFineComponent } from './pay-fine/pay-fine.component';
import { PayFineConfirmationAlertComponent } from './pay-fine-confirmation-alert/pay-fine-confirmation-alert.component';
import { IllComponent } from './ill/ill.component';
import { IllDetailsComponent } from './ill-details/ill-details.component';
import { UpcomingBookingComponent } from './upcoming-booking/upcoming-booking.component';
import { RoomOperationHourComponent } from './room-operation-hour/room-operation-hour.component';
import { ChangeOperationHourAlertComponent } from './change-operation-hour-alert/change-operation-hour-alert.component';
import { ShowBarcodeAlertComponent } from './show-barcode-alert/show-barcode-alert.component';
import { ApproveRegistrationComponent } from './approve-registration/approve-registration.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { CreateBookingAlertComponent } from './create-booking-alert/create-booking-alert.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { RecyclingCentreComponent } from './recycling-centre/recycling-centre.component';
import { BookingRequestComponent } from './booking-request/booking-request.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SignInComponent,
    AuthenticateFailedAlertComponent,
    DashboardComponent,
    UpdateLimitAlertComponent,
    UpdateLimitFailedAlertComponent,
    DiscussionRoomBookingComponent,
    CustomAlertComponent,
    RegisterNewBookComponent,
    RegisterBookItemSuccessAlertComponent,
    RegisterNewItemComponent,
    ModifyBookDetailsComponent,
    ModifyItemDetailsComponent,
    PayFineComponent,
    PayFineConfirmationAlertComponent,
    IllComponent,
    IllDetailsComponent,
    UpcomingBookingComponent,
    RoomOperationHourComponent,
    ChangeOperationHourAlertComponent,
    ShowBarcodeAlertComponent,
    ApproveRegistrationComponent,
    CreateBookingComponent,
    CreateBookingAlertComponent,
    MyBookingComponent,
    TransactionHistoryComponent,
    RecyclingCentreComponent,
    BookingRequestComponent,
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
