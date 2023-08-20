import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FaqsComponent } from './faqs/faqs.component';
import { BlankComponent } from './blank/blank.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from '../shared/components/components.module';
import { UsersComponent } from './users/users.component';
import { EditModalComponent } from './users/edit-modal/edit-modal.component';
import { AddModalComponent } from './users/add-modal/add-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './invoice/modal/modal.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { ViewInvoiceComponent } from './invoicelist/view-invoice/view-invoice.component';
import { EditInvoiceComponent } from './invoicelist/edit-invoice/edit-invoice.component';
import { UsertaskComponent } from './usertask/usertask.component';
import { EditItemsComponent } from './usertask/edit-items/edit-items.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilesComponent } from './usertask/files/files.component';
import { NotificationComponent } from './notification/notification.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { PricingLevelComponent } from './pricing-level/pricing-level.component';
import { OfferingLevelComponent } from './offering-level/offering-level.component';
import { PurchaseLevelComponent } from './purchase-level/purchase-level.component';
import { EditComponent } from './pricing-level/edit/edit.component';
@NgModule({
  declarations: [
    ProfileComponent,
    PricingComponent,
    InvoiceComponent,
    FaqsComponent,
    BlankComponent,
    UsersComponent,
    EditModalComponent,
    AddModalComponent,
    ModalComponent,
    UsertaskComponent,
    InvoicelistComponent,
    ViewInvoiceComponent,
    EditInvoiceComponent,
    EditItemsComponent,
    FilesComponent,
    NotificationComponent,
    InvoiceViewComponent,
    PricingLevelComponent,
    OfferingLevelComponent,
    PurchaseLevelComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    ExtraPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    ComponentsModule,
    MatDialogModule,
    MatAutocompleteModule

  ],
})
export class ExtraPagesModule {}
