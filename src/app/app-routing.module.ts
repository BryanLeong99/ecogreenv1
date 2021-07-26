import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscussionRoomBookingComponent } from './discussion-room-booking/discussion-room-booking.component';
import { RegisterNewBookComponent } from './register-new-book/register-new-book.component';
import { RegisterNewItemComponent } from './register-new-item/register-new-item.component';
import { ModifyBookDetailsComponent } from './modify-book-details/modify-book-details.component';
import { ModifyItemDetailsComponent } from './modify-item-details/modify-item-details.component';
import { PayFineComponent } from './pay-fine/pay-fine.component';
import { IllComponent } from './ill/ill.component';
import { UpcomingBookingComponent } from './upcoming-booking/upcoming-booking.component';
import { RoomOperationHourComponent } from './room-operation-hour/room-operation-hour.component';
import { ApproveRegistrationComponent } from './approve-registration/approve-registration.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { RecyclingCentreComponent } from './recycling-centre/recycling-centre.component';
import { BookingRequestComponent } from './booking-request/booking-request.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'discussion-room-booking', component: DiscussionRoomBookingComponent},
  {path: 'register-new-book', component: RegisterNewBookComponent},
  {path: 'register-new-item', component: RegisterNewItemComponent},
  {path: 'modify-book-details', component: ModifyBookDetailsComponent},
  {path: 'modify-item-details', component: ModifyItemDetailsComponent},
  {path: 'pay-fine', component: PayFineComponent},
  {path: 'ill', component: IllComponent},
  {path: 'upcoming-booking', component: UpcomingBookingComponent},
  {path: 'room-operation-hour', component: RoomOperationHourComponent},
  {path: 'approve-registration', component: ApproveRegistrationComponent},
  {path: 'create-booking', component: CreateBookingComponent},
  {path: 'my-booking', component: MyBookingComponent},
  {path: 'transaction-history', component: TransactionHistoryComponent},
  {path: 'recycling-centre', component: RecyclingCentreComponent},
  {path: 'booking-request', component: BookingRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
