import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialDialogComponent } from 'src/app/components/core/pages/popups/modal/material-dialog/material-dialog.component';
import { Settings } from 'src/app/providers/common-services/settings';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss']
})
export class PopupsComponent implements OnInit {

  @ViewChild('confirmpopup', {static: true}) confirmpopup: any;

  constructor(public dialog: MatDialog, private settings: Settings, private modalService: NgbModal) { }

  ngOnInit() {
  }

  openMaterialModal() {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: screen.width + 'px',
      height: this.settings.modalHeight,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openConfirmationDialog() {
    const size: string = 'md';
    this.modalService.open(this.confirmpopup, { size: size, centered: true, windowClass: 'small-popup' }).result.then((confirm) => {
      if (confirm) { }
    });
  }

}
