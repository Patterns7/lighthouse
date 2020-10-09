import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Settings } from 'src/app/providers/common-services/settings';
import { SharedService } from 'src/app/providers/common-services/shared.service';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from "jquery";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-project-angular';
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(public settings: Settings, private _sharedService: SharedService, public router: Router, public location: Location) {
    this._sharedService.changeEmitted$.subscribe(text => {
      if (text === 'userLoggedIn') {
        this.settings.isLoggedIn = true;
      } else if (text === 'userLoggedOut') {
        this.settings.isLoggedIn = false;
        this.settings.setValue('userData', null);
        this.router.navigate(['/login']);
      }
    });

    if (this.settings.getValue('userData')) {
      this.settings.isLoggedIn = true;
    } else {
      this.settings.isLoggedIn = false;
    }
  }
}
