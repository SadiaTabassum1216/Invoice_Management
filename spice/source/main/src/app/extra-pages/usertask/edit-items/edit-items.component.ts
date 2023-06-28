import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss']
})
export class EditItemsComponent {
  selectedItem: Item = new Item();
  dialogConfig?: MatDialogConfig;
   item: Item= new Item();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public dialog: MatDialog) {
    this.selectedItem = data.item;
     this.item= data.item;
    // console.log("Selected Item is: ",this.selectedItem);
  }


  update() {
    this.http.put<any>(`http://localhost:8000/api/users/${this.selectedItem.itemId}`, this.selectedItem).subscribe(data => {
      console.log(this.selectedItem);
    },
      error => {      
        console.error('An error occurred:', error);
      }
    );
    this.dialog.closeAll();
  }

  close(){
    this.dialog.closeAll();
  }
}
