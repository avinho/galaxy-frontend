import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SeguradoService } from '../seguradoService.service';

export interface Corretor {
  nome: string;
}

@Component({
  selector: 'segurados-form',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './segurados-form.component.html',
  styleUrl: './segurados-form.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true },
    },
  ],
})
export class SeguradosFormComponent {
  corretores: Corretor[] = [
    { nome: 'Alcantara' },
    { nome: 'Fraga' },
    { nome: 'Igo' },
    { nome: 'Josafa' },
    { nome: 'Karina' },
    { nome: 'Sem Corretor' },
  ];

  seguradoFormGroup = this.formBuider.group({
    name: ['', Validators.required],
    document: ['', Validators.required],
    dataNascimento: [''],
    adress: [''],
    postalCode: [''],
    number: [''],
    complement: [''],
    district: [''],
    city: [''],
    state: [''],
    country: [''],
    email: [''],
    phone: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<SeguradosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuider: FormBuilder,
    private service: SeguradoService
  ) {}

  onSubmit() {
    if (this.seguradoFormGroup.valid) {
      const result = {
        name: this.seguradoFormGroup.value.name,
        cpf_cnpj: this.seguradoFormGroup.value.document,
      };
      console.log(result);
      this.service.create(result).subscribe((result) => console.log(result));
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
