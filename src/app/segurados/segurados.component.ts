import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, first, tap } from 'rxjs';
import { SeguradoPage } from '../../utils/SeguradoPage';
import { MyCustomPaginatorIntl } from '../../utils/myCustomPaginator';
import { Segurado } from '../../utils/segurado';
import { SeguradoService } from './seguradoService.service';
import { SeguradosListComponent } from './segurados-list/segurados-list.component';

@Component({
  selector: 'app-segurados',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    SeguradosListComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './segurados.component.html',
  styleUrl: './segurados.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class SeguradosComponent {
  segurados$: Observable<SeguradoPage> | null = null;

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
    private router: Router,
    private route: ActivatedRoute,
    private service: SeguradoService,
    private formBuilder: FormBuilder
  ) {
    this.refresh();
  }

  handlePageEvent(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }
  ) {
    this.length = pageEvent.length;
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.refresh();
  }

  refresh() {
    this.filterValue != '' ? this.findByName(this.filterValue) : this.getData();
  }

  findByName(name: string) {
    this.segurados$ = this.service
      .findByName(name, this.pageIndex, this.pageSize)
      .pipe(
        first(),
        tap((data) => (this.length = data.totalElements))
      );
  }

  getData() {
    this.segurados$ = this.service
      .list(this.pageIndex, this.pageSize)
      .pipe(tap((data) => (this.length = data.totalElements)));
  }

  applyFilter() {
    this.pageIndex = 0;
    this.findByName(this.filterValue);
  }

  onAdd() {
    console.log('onAdd()');
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(segurado: Segurado) {
    console.log(segurado);
    this.router.navigate(['edit', segurado.id], { relativeTo: this.route });
  }

  onDelete(id: number) {
    console.log(id);
    this.service
      .delete(id)
      .pipe(tap(() => this.refresh()))
      .subscribe();
  }

  onFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.filterValue = filter.trim().toLowerCase();
  }
}
