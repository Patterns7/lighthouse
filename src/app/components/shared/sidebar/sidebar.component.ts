import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/providers/common-services/settings';
import { SharedService } from 'src/app/providers/common-services/shared.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  {
    path: "/typography",
    title: "Typography",
    icon: "library_books",
    class: "",
  },
  { path: "/tables", title: "Tables", icon: "content_paste", class: "" },
  {
    path: "/notification",
    title: "Notifications",
    icon: "notifications",
    class: "",
  },
  {
    path: "/popup",
    title: "Popup",
    icon: "announcement",
    class: "",
  },
  {
    path: "/tabs",
    title: "Tabs",
    icon: "tab",
    class: "",
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  userData: any = null;
  userName: string = '';

  constructor(public settings: Settings, private sharedService: SharedService) {
    this.sharedService.changeEmitted$.subscribe(text => {
      if (text === 'userLoggedIn') {
        this.userData = this.settings.getValue('userData');
        this.userData !== null ? this.userName = this.userData.users.userName : this.userName = '';
      } else if (text === 'userLoggedOut') {
        this.settings.isLoggedIn = false;
        this.settings.setValue('userData', null);
        this.userName = '';
      }
    });
    this.userData = this.settings.getValue('userData');
    this.userData !== null ? this.userName = this.userData.users.userName : this.userName = '';
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
