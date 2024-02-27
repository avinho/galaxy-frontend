import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Segurado } from '../../../utils/segurado';

@Component({
  selector: 'segurados-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule],
  templateUrl: './segurados-list.component.html',
  styleUrl: './segurados-list.component.scss',
})
export class SeguradosListComponent {
  @Input() segurados: Segurado[] = [];
  readonly displayedColumns: string[] = ['id', 'name', 'cpf_cnpj', 'actions'];

  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions = [5, 10, 15];
  @Input() filterValue = '';

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  constructor() {}

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

  /*   filter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    this.length = this.dataSource.data.length;
    if (!this.filterValue) {
      //this.getData();
    }
  } */

  onAdd() {
    this.add.emit(true);
  }

  onEdit(segurado: Segurado) {
    this.edit.emit(segurado);
  }

  onDelete(id: number) {
    this.remove.emit(id);
  }
}
