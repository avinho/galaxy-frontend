import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Segurado } from './segurado';
import { SeguradoService } from './segurados/seguradoService.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
})
export class AppComponent {
  title = 'galaxy';
  segurados: Segurado[] | null = null;

  form = this.formBuilder.group({
    name: [''],
    cpf_cnpj: [''],
  });

  constructor(
    private service: SeguradoService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit() {
    this.service.create(this.form.value);
  }
}
