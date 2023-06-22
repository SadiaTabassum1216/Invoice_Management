import { Component } from '@angular/core';

@Component({
  selector: 'app-about-staff',
  templateUrl: './about-staff.component.html',
  styleUrls: ['./about-staff.component.scss'],
})
export class AboutStaffComponent {
  constructor() {
    //constructor
  }

  breadscrums = [
    {
      title: 'About Staffs',
      items: ['Home'],
      active: 'About Staffs',
    },
  ];
}
