import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  city: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { firstName: "Mark", lastName: "Otto", city: "Aachen" },
  { firstName: "Jacob", lastName: "Thornton", city: "Aberdeen" },
  { firstName: "Larry", lastName: "the Bird", city: "Abilene" },
];

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements OnInit {
  displayedColumns: string[] = ["firstName", "lastName", "city"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource1 = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
}
