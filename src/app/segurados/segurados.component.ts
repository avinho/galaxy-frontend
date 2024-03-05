import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { SeguradoPage } from '../../utils/SeguradoPage';
import { Segurado } from '../../utils/segurado';
import { SeguradoService } from './seguradoService.service';
import { SeguradosListComponent } from './segurados-list/segurados-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  FormResult,
  SeguradosFormComponent,
} from './segurados-form/segurados-form.component';

@Component({
  selector: 'app-segurados',
  standalone: true,
  imports: [
    MatDividerModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    SeguradosListComponent,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDialogModule,
  ],
  templateUrl: './segurados.component.html',
  styleUrl: './segurados.component.scss',
})
export class SeguradosComponent implements OnInit {
  segurados$: SeguradoPage | null = null;

  filterValue: string = '';
  pageIndex = 0;
  pageSize = 10;
  length = 0;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: SeguradoService
  ) {}
  ngOnInit(): void {
    this.refresh();
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.refresh();
  }

  refresh() {
    this.filterValue != '' ? this.filterByName() : this.getData();
  }

  filterByName() {
    this.service
      .findByName(this.filterValue, this.pageIndex, this.pageSize)
      .pipe(
        tap((data) => {
          this.segurados$ = data;
        })
      )
      .subscribe();
  }

  getData() {
    this.service
      .list(this.pageIndex, this.pageSize)
      .pipe(
        tap((data) => {
          this.segurados$ = data;
        })
      )
      .subscribe();
  }

  onAdd() {
    const dialogRef = this.dialog.open(SeguradosFormComponent, {
      maxWidth: '75vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe((result: FormResult) => {
      if (result) {
        this.createSegurado(result);
      }
    });
  }

  private createSegurado(result: FormResult) {
    const seguradoService =
      result.tipo === 'PF'
        ? this.service.createPF(result.data)
        : this.service.createPJ(result.data);

    seguradoService.subscribe({
      next: () => this.refresh(),
      error: (error) => console.error('Error ao criar segurado: ', error),
    });
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
