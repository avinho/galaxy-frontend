import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navlist } from '../utils/navList';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
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
  ];

  constructor() {}
}
