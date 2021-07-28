import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CreateBookingComponent } from './create-booking/create-booking.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { RecyclingCentreComponent } from './recycling-centre/recycling-centre.component';
import { BookingRequestComponent } from './booking-request/booking-request.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ItemAcceptedComponent } from './item-accepted/item-accepted.component';
import { RegisterCollectorComponent } from './register-collector/register-collector.component';
import { PayToCollectorComponent } from './pay-to-collector/pay-to-collector.component';
import { MyRatingComponent } from './my-rating/my-rating.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'sign-in', component: SignInComponent},

  {path: 'create-booking', component: CreateBookingComponent},
  {path: 'my-booking', component: MyBookingComponent},
  {path: 'transaction-history', component: TransactionHistoryComponent},
  {path: 'recycling-centre', component: RecyclingCentreComponent},
  {path: 'booking-request', component: BookingRequestComponent},
  {path: 'cash-out', component: CashOutComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: 'item-accepted', component: ItemAcceptedComponent},
  {path: 'register-collector', component: RegisterCollectorComponent},
  {path: 'pay-to-collector', component: PayToCollectorComponent},
  {path: 'my-rating', component: MyRatingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
