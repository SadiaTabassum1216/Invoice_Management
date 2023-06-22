import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FaqsComponent } from './faqs/faqs.component';
import { BlankComponent } from './blank/blank.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'faqs',
    component: FaqsComponent
  },
 
  {
    path: 'blank',
    component: BlankComponent
  },
  {
    path: 'user',
    component: UsersComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
