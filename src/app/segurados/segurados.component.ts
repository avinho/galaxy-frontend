import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SeguradoService } from './seguradoService.service';

@Component({
  selector: 'app-segurados',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './segurados.component.html',
  styleUrl: './segurados.component.scss',
})
export class SeguradosComponent {
  displayedColumns: string[] = ['name', 'cpf_cnpj'];
  segurados: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;
  lenght = 0;

  constructor(private service: SeguradoService) {
    this.getAll();
    console.log(this.lenght);
  }

  getAll(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.service
      .list(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe((data) => {
        this.segurados = new MatTableDataSource(data.segurados);
        this.segurados.paginator = this.paginator;
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
        this.lenght = data.totalElements;
      });
  }
}
