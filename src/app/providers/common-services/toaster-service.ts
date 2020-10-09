import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class ToasterService {
    _user: any;

    constructor(private toastr: ToastrManager) {

    }

    /**
     * Show success toaster from ToastrService
     */
    success(message, details) {
        this.toastr.successToastr(message, details, {
          toastTimeout : 6000,
          showCloseButton : true,
          dismiss : 'click',
          maxShown : 1
        });
    }

    /**
     * Show error toaster from ToastrService
     */
    error(message, details) {
        this.toastr.errorToastr(message, details, {
          toastTimeout : 6000,
          showCloseButton : true,
          dismiss : 'click',
          maxShown : 1
        });
    }

    warning(message, details) {
      this.toastr.warningToastr(message, details, {
        toastTimeout : 6000,
          showCloseButton : true,
          dismiss : 'click',
          maxShown : 1
      });
    }
}
