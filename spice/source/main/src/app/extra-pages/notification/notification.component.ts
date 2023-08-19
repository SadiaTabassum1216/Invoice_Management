import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  constructor( private http: HttpClient){}
  ngOnInit(): void {
    this.getNotifications();

  }
  notificationList: any;

  getNotifications() {
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/notification`)
      .subscribe((data) => {
        console.log(data);
        this.notificationList=data;
      }
     
    );
  }


}
