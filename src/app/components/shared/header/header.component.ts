import { Component, OnInit, ElementRef } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { ROUTES } from '../sidebar/sidebar.component';
import { Settings } from 'src/app/providers/common-services/settings';
import { SharedService } from 'src/app/providers/common-services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private listTitles: any[];
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  userName: string = '';
  userData: any = null;

  constructor(private location: Location,  private element: ElementRef, private router: Router, public settings: Settings, private sharedService: SharedService) {
    this.location = location;
    this.sidebarVisible = false;
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
    this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function(){
        toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
      const body = document.getElementsByTagName('body')[0];
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
  };
  sidebarToggle() {
      var $toggle = document.getElementsByClassName('navbar-toggler')[0];

      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
      const body = document.getElementsByTagName('body')[0];

      if (this.mobile_menu_visible == 1) {
          body.classList.remove('nav-open');
          if ($layer) {
              $layer.remove();
          }
          setTimeout(function() {
              $toggle.classList.remove('toggled');
          }, 400);

          this.mobile_menu_visible = 0;
      } else {
          setTimeout(function() {
              $toggle.classList.add('toggled');
          }, 430);

          var $layer = document.createElement('div');
          $layer.setAttribute('class', 'close-layer');


          if (body.querySelectorAll('.main-panel')) {
              document.getElementsByClassName('main-panel')[0].appendChild($layer);
          }else if (body.classList.contains('off-canvas-sidebar')) {
              document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
          }

          setTimeout(function() {
              $layer.classList.add('visible');
          }, 100);

          $layer.onclick = function() { //asign a function
            body.classList.remove('nav-open');
            this.mobile_menu_visible = 0;
            $layer.classList.remove('visible');
            setTimeout(function() {
                $layer.remove();
                $toggle.classList.remove('toggled');
            }, 400);
          }.bind(this);

          body.classList.add('nav-open');
          this.mobile_menu_visible = 1;

      }
  };

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }


}
