import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { httpOptions } from 'src/app/http_headers/httpOptions';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router){}
 
  ngOnInit(): void {
    this.getNotifications();

  }
  notificationList: any;

  getNotifications() {
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/notifications`, httpOptions)
    .subscribe((data) => {   
      this.notificationList = data;
      console.log("Notification: ",this.notificationList);
    });
  }

  onNotificationClick(notification: any){
    this.http.post<any>(`${backendEnvironment.apiUrl}/api/markAsRead/${notification.id}`, httpOptions)
      .subscribe((data) => {
        console.log(data);
      });

    this.router.navigate(['extra-pages','pricing_level']);
   
  }


}
