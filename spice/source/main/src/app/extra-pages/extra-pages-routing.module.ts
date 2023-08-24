import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { BlankComponent } from './blank/blank.component';
import { UsersComponent } from './users/users.component';
import { UsertaskComponent } from './usertask/usertask.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { NotificationComponent } from './notification/notification.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { PricingLevelComponent } from './pricing-level/pricing-level.component';
import { OfferingLevelComponent } from './offering-level/offering-level.component';
import { PurchaseLevelComponent } from './purchase-level/purchase-level.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
 
  {
    path: 'invoice',
    component: InvoiceComponent
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
  {
    path: 'payment',
    component: PaymentComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
