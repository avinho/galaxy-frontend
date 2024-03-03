import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'segurados' },
  {
    path: 'segurados',
    loadChildren: () =>
      import('./segurados/segurados.routes').then((m) => m.SEGURADOS_ROUTES),
  },
];
