import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class SharedService {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    private detectChangeSource = new Subject<any>();
    // Observable string streams
    changesEmitted$ = this.detectChangeSource.asObservable();
    

    emitChange(change: any) {
      this.emitChangeSource.next(change);
    }
    detectChange(change: any) {
      this.detectChangeSource.next(change);
    }

  }
