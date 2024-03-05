import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Corretor } from '../../../utils/corretor';
import { PessoaFisica } from '../../../utils/pessoaFisica';
import { PessoaJuridica } from '../../../utils/pessoaJuridica';

export interface FormResult {
  tipo: string;
  data: PessoaFisica | PessoaJuridica;
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
    MatRadioModule,
    CommonModule,
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
    tipo: ['', Validators.required],
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
    corretor: [''],
  });

  @Output() add = new EventEmitter(false);

  constructor(
    public dialogRef: MatDialogRef<SeguradosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuider: FormBuilder
  ) {}

  onSubmit() {
    if (this.seguradoFormGroup.valid) {
      let result: FormResult;
      let tipoSegurado = this.seguradoFormGroup.controls['tipo'].value;

      switch (tipoSegurado) {
        case 'PF': {
          result = {
            tipo: tipoSegurado,
            data: {
              name: this.seguradoFormGroup.value.name!,
              document: this.seguradoFormGroup.value.document!,
              birthDate: this.seguradoFormGroup.value.dataNascimento!,
            },
          };
          break;
        }
        case 'PJ': {
          result = {
            tipo: tipoSegurado,
            data: {
              name: this.seguradoFormGroup.value.name!,
              document: this.seguradoFormGroup.value.document!,
            },
          };
          break;
        }
        default: {
          throw Error('Invalid tipo segurado option');
        }
      }
      this.dialogRef.close(result);
    }
  }
}
