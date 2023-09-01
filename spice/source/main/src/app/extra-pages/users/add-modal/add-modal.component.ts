import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent {
  newUser: User = new User(0, '', '',[]);
  constructor(private http: HttpClient,  public dialog: MatDialog) { }
 
  categories: string[] = ['Admin', 'Employee'];

  
  addUser() {
    // console.log(this.newUser);
    this.http.post<any>(`${backendEnvironment.apiUrl}/api/users`, this.newUser).subscribe(data => {
      // console.log(this.newUser);
    });
    
     this.dialog.closeAll();
    
  }

  close(){
    this.dialog.closeAll();
  }


}
