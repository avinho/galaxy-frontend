import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Segurado } from '../../../utils/segurado';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
export class SeguradosListComponent implements OnChanges {
  @Input() segurados: Segurado[] = [];
  readonly displayedColumns: string[] = ['id', 'name', 'cpf_cnpj', 'actions'];

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  @Input() filterValue: string = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterValue']) {
      console.log(this.filterValue);

      //this.filter(this.filterValue);
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

  /*   filter(data: string) {
    this.segurados.filter = this.filterValue.trim().toLowerCase();

  } */

  receberValorDoPai(event: any) {
    this.filterValue = event;
  }

  onAdd() {
    console.log(this.filterValue);
    //this.add.emit(true);
  }

  onEdit(segurado: Segurado) {
    this.edit.emit(segurado);
  }

  onDelete(id: number) {
    this.remove.emit(id);
  }
}
