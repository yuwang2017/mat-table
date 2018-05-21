import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface MtableItem {
  name: string;
  id: number;
  color: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: MtableItem[] = [
  {id: 1, name: 'Hydrogen', color: 'Red'},
  {id: 2, name: 'Helium', color: 'Green'},
  {id: 3, name: 'Lithium', color: 'Red'},
  {id: 4, name: 'Beryllium', color: 'Purple'},
  {id: 5, name: 'Boron', color: 'Blue'},
  {id: 6, name: 'Carbon', color: 'Purple'},
  {id: 7, name: 'Nitrogen', color: 'Red'},
  {id: 8, name: 'Oxygen', color: 'Red'},
  {id: 9, name: 'Fluorine', color: 'Purple'},
  {id: 10, name: 'Neon', color: 'Blue'},
  {id: 11, name: 'Sodium', color: 'Red'},
  {id: 12, name: 'Magnesium', color: 'Blue'},
  {id: 13, name: 'Aluminum', color: 'Red'},
  {id: 14, name: 'Silicon', color: 'Green'},
  {id: 15, name: 'Phosphorus', color: 'Red'},
  {id: 16, name: 'Sulfur', color: 'Purple'},
  {id: 17, name: 'Chlorine', color: 'Red'},
  {id: 18, name: 'Argon', color: 'Red'},
  {id: 19, name: 'Potassium', color: 'Red'},
  {id: 20, name: 'Calcium', color: 'Green'},
];

/**
 * Data source for the Mtable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MtableDataSource extends DataSource<MtableItem> {
  data: MtableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MtableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MtableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MtableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
