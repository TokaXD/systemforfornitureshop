import { Component } from '@angular/core';
import { MatLine } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';


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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    provideNgxMask(),
  ]
})
export class LoginComponent {
  
  //Define true para liberar a senha ou ocultar a senha
  hide = true

  form = new FormGroup({
  //Area para criar relacao entre os forms e o html
    email: new FormControl('', [Validators.required, Validators.email]),

    name: new FormControl('', [Validators.required]),

    cellphone: new FormControl('', [Validators.required]),

    document: new FormControl('', [Validators.required]),

    gender: new FormControl('')
  })


  //Area para criar os erros de mensagens
  emailErrorMessage = '';
  nameErrorMessage = '';
  cellphoneErrorMessage = '';
  documentErrorMessage = '';



  //Area do constructor para acinar os validators caso tenha alguma interação com os filds
  constructor() {
    this.form.valueChanges.subscribe(()=>{
      this.updateCellphoneErrorMessage();
      this.updateEmailErrorMessage();
      this.updateNameErrorMessage();
      this.updatedocumentErrorMessage();
    })
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário válido, enviar dados:', this.form.value);
      // Aqui você pode adicionar sua lógica para enviar os dados para o servidor
    } else {
      console.log('Formulário inválido, verificar erros.');
      this.form.markAllAsTouched();  // Isso fará com que todas as mensagens de erro sejam mostradas
    }
  }


  //area para criar as mensagens de erro da tela de login 
  updateEmailErrorMessage(){
    const email = this.form.get('email');
    if(email?.errors?.['required']){
      this.emailErrorMessage = 'Este Campo Precisa De Um Valor'
    } else if(email?.errors?.['email']){
      this.emailErrorMessage = 'Email Não é Valido';
    } else {
      this.emailErrorMessage = '';
    }
  }

  updateNameErrorMessage() {
    const name = this.form.get('name');
    if (name?.errors?.['required']) {
      this.nameErrorMessage = 'Este Campo Precisa De Um Valor';
    } else {
      this.nameErrorMessage = '';
    }
  }

  updateCellphoneErrorMessage() {
    const cellphone = this.form.get('cellphone')
    if (cellphone?.errors?.['required']) {
      this.cellphoneErrorMessage = 'Numero De Telefone Necessario';
    } else {
      this.cellphoneErrorMessage = '';
    }
  }

  updatedocumentErrorMessage() {
    const document = this.form.get('document')
    if (document?.errors?.['required']){
      this.documentErrorMessage = 'Numero do Documento Necessario CPF/CNPJ';
    } else {
      this.documentErrorMessage = '';    
    }
  }

}

