import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss']
})
export class MaterialDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close({event: 'close',data: ''});
  }

}
