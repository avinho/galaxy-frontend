import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { SeguradosFormComponent } from './segurados-form/segurados-form.component';

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
export class SeguradosComponent {
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
  ) {
    this.refresh();
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.refresh();
  }

  refresh() {
    this.filterValue != ''
      ? this.findByName(this.filterValue, this.pageIndex, this.pageSize)
      : this.getData(this.pageIndex, this.pageSize);
  }

  findByName(name: string, pageIndex: number, pageSize: number) {
    this.service
      .findByName(name, pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.segurados$ = data;
        })
      )
      .subscribe();
  }

  getData(pageIndex: number, pageSize: number) {
    this.service
      .list(pageIndex, pageSize)
      .pipe(
        tap((data) => {
          this.segurados$ = data;
        })
      )
      .subscribe();
  }

  onAdd() {
    console.log('onAdd()');
    const dialogRef = this.dialog.open(SeguradosFormComponent, {
      data: { name: 'alvaro', animal: 'luke' },
      maxWidth: '75vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
    //this.router.navigate(['new'], { relativeTo: this.route });
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
