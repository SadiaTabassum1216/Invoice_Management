import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FaqsComponent } from './faqs/faqs.component';
import { BlankComponent } from './blank/blank.component';
import { UsersComponent } from './users/users.component';
import { UsertaskComponent } from './usertask/usertask.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { NotificationComponent } from './notification/notification.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { PricingLevelComponent } from './pricing-level/pricing-level.component';
import { OfferingLevelComponent } from './offering-level/offering-level.component';
import { PurchaseLevelComponent } from './purchase-level/purchase-level.component';

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
  {
    path: 'userprofile',
    component: UsertaskComponent
  },
  {
    path: 'invoicelist',
    component: InvoicelistComponent
  },
  {
    path: 'invoice_view',
    component: InvoiceViewComponent
  },
  {
    path: 'pricing_level',
    component: PricingLevelComponent
  },
  {
    path: 'offering_level',
    component: OfferingLevelComponent
  },
  {
    path: 'purchase_level',
    component: PurchaseLevelComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
