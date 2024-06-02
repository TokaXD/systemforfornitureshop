import { Component } from '@angular/core';
import { MatLine } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { passwordValidator } from './validators/password.validator'
import { ApiService } from '../../app.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatLine,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMaskDirective,
    MatRadioModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    provideNgxMask(),
    ApiService
  ]
})
export class LoginComponent {
  hide = true;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    FullName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    cellphone: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, passwordValidator()])
  });

  emailErrorMessage = '';
  nameErrorMessage = '';
  cellphoneErrorMessage = '';
  documentErrorMessage = '';
  passwordErrorMessage = '';
  genderErrorMessage = '';

  constructor(private apiService: ApiService) {
    this.form.valueChanges.subscribe(() => {
      this.updateEmailErrorMessage();
      this.updateNameErrorMessage();
      this.updateCellphoneErrorMessage();
      this.updateDocumentErrorMessage();
      this.updatePasswordErrorMessage();
      this.updateGenderErrorMessage();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário válido, enviar dados:', this.form.value);
      this.apiService.createUser(this.form.value).subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso:', response);
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
        },
        complete: () => {
          console.log('Requisição concluída');
        }
      });
    } else {
      console.log('Formulário inválido, verificar erros.');
      this.form.markAllAsTouched();
      this.updateEmailErrorMessage();
      this.updateNameErrorMessage();
      this.updateCellphoneErrorMessage();
      this.updateDocumentErrorMessage();
      this.updatePasswordErrorMessage();
      this.updateGenderErrorMessage();
    }
  }

  updateEmailErrorMessage() {
    const email = this.form.get('email');
    if (email?.errors?.['required']) {
      this.emailErrorMessage = 'Este Campo Precisa De Um Valor';
    } else if (email?.errors?.['email']) {
      this.emailErrorMessage = 'Email Não é Valido';
    } else {
      this.emailErrorMessage = '';
    }
  }

  updateNameErrorMessage() {
    const name = this.form.get('FullName');
    if (name?.errors?.['required']) {
      this.nameErrorMessage = 'Este Campo Precisa De Um Valor';
    } else if (name?.errors?.['maxlength']) {
      this.nameErrorMessage = 'O nome deve ter no máximo 50 caracteres';
    } else if (name?.errors?.['repeatedChars']) {
      this.nameErrorMessage = 'O nome não pode conter caracteres repetidos em sequência';
    } else {
      this.nameErrorMessage = '';
    }
  }

  updateCellphoneErrorMessage() {
    const cellphone = this.form.get('cellphone');
    if (cellphone?.errors?.['required']) {
      this.cellphoneErrorMessage = 'Numero De Telefone Necessario';
    } else {
      this.cellphoneErrorMessage = '';
    }
  }

  updateDocumentErrorMessage() {
    const document = this.form.get('document');
    if (document?.errors?.['required']) {
      this.documentErrorMessage = 'Numero do Documento Necessario CPF/CNPJ';
    } else {
      this.documentErrorMessage = '';
    }
  }

  updatePasswordErrorMessage() {
    const password = this.form.get('password');
    if (password?.errors?.['required']) {
      this.passwordErrorMessage = 'Este Campo Precisa De Um Valor';
    } else if (password?.errors?.['passwordStrength']) {
      this.passwordErrorMessage = 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.';
    } else {
      this.passwordErrorMessage = '';
    }
  }

  updateGenderErrorMessage() {
    const gender = this.form.get('sex');
    if (gender?.errors?.['required']) {
      this.genderErrorMessage = 'Este Campo Precisa De Um Valor';
    } else {
      this.genderErrorMessage = '';
    }
  }
}
