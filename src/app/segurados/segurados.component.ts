import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyCustomPaginatorIntl } from '../../utils/myCustomPaginator';
import { Segurado } from '../segurado';
import { SeguradoService } from './seguradoService.service';

@Component({
  selector: 'app-segurados',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './segurados.component.html',
  styleUrl: './segurados.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class SeguradosComponent {
  displayedColumns: string[] = ['id', 'name', 'cpf_cnpj'];
  segurados: MatTableDataSource<Segurado> = new MatTableDataSource();

  pageIndex = 0;
  pageSize = 10;
  length = 0;
  pageSizeOptions = [5, 10, 15];
  filterValue: string = '';

  form = this.formBuilder.group({
    name: [''],
    cpf_cnpj: [''],
  });

  constructor(
    private service: SeguradoService,
    private formBuilder: FormBuilder
  ) {
    this.getData();
  }

  handlePageEvent(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }
  ) {
    this.length = pageEvent.length;
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.filterValue != '' ? this.findByName(this.filterValue) : this.getData();
  }

  findByName(name: string) {
    this.service
      .findByName(name, this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.segurados.data = data.segurados;
        this.length = data.totalElements;
      });
  }

  getData() {
    this.service.list(this.pageIndex, this.pageSize).subscribe((data) => {
      this.segurados.data = data.segurados;
      this.length = data.totalElements;
    });
  }

  applyFilter() {
    this.pageIndex = 0;
    this.findByName(this.filterValue);
  }

  filter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.segurados.filter = this.filterValue.trim().toLowerCase();
    this.length = this.segurados.data.length;
    if (!this.filterValue) {
      this.getData();
    }
  }

  onSubmit() {
    this.service.create(this.form.value);
  }
}
