import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

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
    NgxMaskDirective,
  ],
  templateUrl: './segurados-form.component.html',
  styleUrl: './segurados-form.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
    provideNgxMask(),
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true },
    },
  ],
})
export class SeguradosFormComponent implements OnInit {
  @Output() add = new EventEmitter(false);

  corretores: Corretor[] = [
    { nome: 'Alcantara' },
    { nome: 'Fraga' },
    { nome: 'Igo' },
    { nome: 'Josafa' },
    { nome: 'Karina' },
    { nome: 'Sem Corretor' },
  ];

  seguradoFormGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SeguradosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuider: FormBuilder
  ) {}

  ngOnInit() {
    this.seguradoFormGroup = this.formBuider.group({
      dadosPessoais: this.formBuider.group({
        name: ['', Validators.required],
        tipo: [null, Validators.required],
        document: ['', Validators.required],
        birthDate: [''],
      }),
      addressGroup: this.formBuider.group({
        address: [''],
        postalCode: [''],
        number: [''],
        complement: [''],
        district: [''],
        city: [''],
        state: [''],
        country: [''],
      }),
      contact: this.formBuider.group({
        email: ['', Validators.email],
        phone: [''],
      }),
      corretor: [''],
    });
  }

  onSubmit() {
    console.log(this.seguradoFormGroup.valid);
    if (this.seguradoFormGroup.valid) {
      let result: FormResult;
      let tipoSegurado =
        this.seguradoFormGroup.get('dadosPessoais.tipo')!.value;

      switch (tipoSegurado) {
        case 'PF': {
          result = {
            tipo: tipoSegurado,
            data: {
              name: this.seguradoFormGroup.get('dadosPessoais.name')!.value,
              document: this.seguradoFormGroup.get('dadosPessoais.document')!
                .value,
              birthDate: this.seguradoFormGroup.get('dadosPessoais.birthDate')!
                .value,
            },
          };
          break;
        }
        case 'PJ': {
          result = {
            tipo: tipoSegurado,
            data: {
              name: this.seguradoFormGroup.get('dadosPessoais.name')!.value!,
              document: this.seguradoFormGroup.get('dadosPessoais.document')!
                .value,
            },
          };
          break;
        }
        default: {
          throw Error('Invalid tipo segurado option');
        }
      }
      console.log(result);
      this.dialogRef.close(result);
    }
  }

  getErrorMessage(formGroup: string, field: string) {
    if (
      this.seguradoFormGroup.get(formGroup)?.get('field')?.hasError('required')
    ) {
      return 'O campo é obrigatorio';
    }

    return this.seguradoFormGroup.get(field)?.hasError('email')
      ? 'Não é um e-mail valido'
      : '';
  }
}
