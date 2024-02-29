import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
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

  filterValue: string = '';
  pageIndex = 0;
  pageSize = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SeguradoService
  ) {
    this.refresh();
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.refresh(pageEvent);
  }

  refresh(pageEvent: PageEvent = { pageIndex: 0, pageSize: 10, length: 0 }) {
    this.filterValue != ''
      ? this.findByName(this.filterValue, pageEvent)
      : this.getData(pageEvent);
  }

  findByName(name: string, pageEvent: PageEvent) {
    this.segurados$ = this.service.findByName(
      name,
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
  }

  getData(pageEvent: PageEvent) {
    this.segurados$ = this.service.list(
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
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
    this.service.delete(id).subscribe(() => this.refresh());
  }

  onFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.filterValue = filter.trim().toLowerCase();
  }
}
