import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EditItemModalComponent } from './edit-item-modal/edit-item-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';
import { EditItemsComponent } from './edit-items/edit-items.component';

@Component({
  selector: 'app-usertask',
  templateUrl: './usertask.component.html',
  styleUrls: ['./usertask.component.scss']
})
export class UsertaskComponent implements OnInit{
  ngOnInit(): void {
    this.getItemList();
  }

  constructor(private http: HttpClient,  private dialogModel: MatDialog) {}

  items: Item[] = [];
  selectedItem: Item= new Item();
  dialog?: MatDialogRef<EditItemsComponent>;

   getItemList() {
    // this.http.get<any[]>('http://localhost:8000/api/items').subscribe(data => {
    //   this.items = data;
    //   console.log(this.items);
    // });
    const item1: Item = {
      itemId: '1',
      userId: 'user1',
      UOMId: 'uom1',
      firstPrice: 10,
      lastPrice: 20,
      quantity: 5,
      VAT: 5,
      unitPrice: 15,
      additionalCost: 2,
      purchaseAdditionalCost: 3,
      deliveryAdditionalCost: 1,
      totalPrice: 100,
      POD: 'pod1',
      closingDate: new Date('2023-06-30'),
      purchasePrice: 30,
      isFirstPaymentDone: true,
      firstPaymentPrice: 5,
      firstPaymentDate: new Date('2023-06-25'),
      isLastPaymentDone: false,
      lastPaymentPrice: 0,
      lastPaymentDate: new Date('Invalid Date'),
      logisticCompany: 'company1',
      logisticLocation: 'location1',
      logisticEstimatedDate: new Date('2023-07-05'),
      shippingStatus: 'status1',
      isDeliveredToIraq: false,
      isDeliveredByLogistic: true,
      isDeliverToClient: false,
      logisticCost: 50,
      isFullyPaid: false,
      isSubmitted: true,
      status: 'pending',
      uploadedFiles1: [],
      uploadedFiles2: [],
      uploadedFiles3: []
    };
  
    const item2: Item = {
      itemId: '2',
      userId: 'user2',
      UOMId: 'uom2',
      firstPrice: 5,
      lastPrice: 10,
      quantity: 3,
      VAT: 2,
      unitPrice: 7,
      additionalCost: 1,
      purchaseAdditionalCost: 2,
      deliveryAdditionalCost: 1,
      totalPrice: 300,
      POD: 'pod2',
      closingDate: new Date('2023-07-02'),
      purchasePrice: 20,
      isFirstPaymentDone: true,
      firstPaymentPrice: 3,
      firstPaymentDate: new Date('2023-06-27'),
      isLastPaymentDone: true,
      lastPaymentPrice: 2,
      lastPaymentDate: new Date('2023-06-29'),
      logisticCompany: 'company2',
      logisticLocation: 'location2',
      logisticEstimatedDate: new Date('2023-07-07'),
      shippingStatus: 'status2',
      isDeliveredToIraq: true,
      isDeliveredByLogistic: true,
      isDeliverToClient: true,
      logisticCost: 40,
      isFullyPaid: true,
      isSubmitted: true,
      status: 'good',
      uploadedFiles1: [],
      uploadedFiles2: [],
      uploadedFiles3: []
    };
  
    // Push the items to the items array
    this.items.push(item1, item2);
  
  }

  
edit(item: Item): void {
  this.selectedItem = item;
    //  console.log(this.selectedItem);
  
    this.dialogModel.open(EditItemsComponent, {
      width: '640px',
      disableClose: true,
      data: {
        item: this.selectedItem
      }
    });
 
}

delete(item: Item): void {
  const index = this.items.indexOf(item);
  if (index !== -1) {
    this.items.splice(index, 1);
  }



  this.http.delete<any>(`http://localhost:8000/api/item/${item.itemId}`).subscribe(
    data => {
      console.log("Item deleted successfully");
      window.location.reload();
    },
    error => {
      console.log(error);
    }
  );

}

}
