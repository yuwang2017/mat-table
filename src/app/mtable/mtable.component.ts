import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MtableDataSource } from './mtable-datasource';

@Component({
  selector: 'mtable',
  templateUrl: './mtable.component.html',
  styleUrls: ['./mtable.component.css']
})
export class MtableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MtableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'color'];

  ngOnInit() {
    this.dataSource = new MtableDataSource(this.paginator, this.sort);
  }
}
