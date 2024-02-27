import { Routes } from '@angular/router';
import { SeguradosComponent } from './segurados/segurados.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'segurados' },
  {
    path: 'segurados',
    component: SeguradosComponent,
  },
];
