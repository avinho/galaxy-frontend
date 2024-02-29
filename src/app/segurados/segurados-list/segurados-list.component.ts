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
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Segurado } from '../../../utils/segurado';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';

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
})
export class SeguradosListComponent
  implements OnInit, OnChanges, AfterViewInit
{
  readonly displayedColumns: string[] = ['id', 'name', 'cpf_cnpj', 'actions'];

  @Input() segurados: any;
  @Input() filterValue: string = '';

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() pageEv = new EventEmitter<PageEvent>(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() pageIndex = 0;
  @Input() pageSize = 10;
  @Input() length: number = 0;
  pageSizeOptions = [5, 10, 15];

  constructor() {}
  ngAfterViewInit(): void {
    this.segurados.sort = this.sort;
  }

  ngOnInit(): void {
    this.segurados = new MatTableDataSource(this.segurados);
    this.segurados.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterValue']) {
      this.segurados.filter = this.filterValue;
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

  handlePageEvent(pageEvent: PageEvent) {
    this.pageEv.emit(pageEvent);
  }
}
