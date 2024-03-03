import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Navlist } from '../utils/navList';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
  ],
})
export class AppComponent {
  title = 'galaxy';

  navlist: Navlist[] = [
    {
      icon: 'home',
      name: 'Home',
      path: '/home',
    },
    {
      icon: 'groups',
      name: 'Segurados',
      path: '/segurados',
    },
    {
      icon: 'description',
      name: 'Apólices',
      path: '/apolices',
    },
    {
      icon: 'car_crash',
      name: 'Sinistros',
      path: '/sinistros',
    },
    {
      icon: 'payments',
      name: 'Financeiro',
      path: '/financeiro',
    },
    {
      icon: 'query_stats',
      name: 'Relatórios',
      path: '/relatorios',
    },
    {
      icon: 'assignment_ind',
      name: 'Cadastros',
      path: '/cadastros',
    },
    {
      icon: 'settings',
      name: 'Configurações',
      path: '/configuracoes',
    },
  ];

  constructor(public router: Router) {}
}
