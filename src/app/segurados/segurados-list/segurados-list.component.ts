import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyCustomPaginatorIntl } from '../../../utils/myCustomPaginator';
import { Segurado } from '../../../utils/segurado';

@Component({
  selector: 'segurados-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './segurados-list.component.html',
  styleUrl: './segurados-list.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class SeguradosListComponent
  implements OnInit, OnChanges, AfterViewInit
{
  readonly displayedColumns: string[] = [
    'id',
    'name',
    'tipo',
    'document',
    'actions',
  ];

  @Input() segurados: any;
  dataSource = new MatTableDataSource<Segurado>();
  @Input() filterValue: string = '';
  @Input() pageIndex = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25, 100];
  @Input() length = 0;

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() refresh = new EventEmitter(false);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.segurados);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['segurados']) {
      this.dataSource.data = this.segurados;
    }
    if (changes['filterValue']) {
      this.dataSource.filter = this.filterValue;
    }
  }

  format(value: string): string {
    value = value.replace(/\D/g, '');

    switch (value.length) {
      case 11: {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      case 14: {
        return value.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5'
        );
      }
      default: {
        return value;
      }
    }
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(segurado: Segurado) {
    this.edit.emit(segurado);
  }

  onDelete(id: number) {
    this.remove.emit(id);
  }

  onPageChange(event: any) {
    this.refresh.emit(event);
  }
}
