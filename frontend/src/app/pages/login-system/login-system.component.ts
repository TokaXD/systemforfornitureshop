import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-system',
  standalone: true,
  imports: [DefaultLoginLayoutComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login-system.component.html',
  styleUrl: './login-system.component.scss'
})
export class LoginSystemComponent {
  loginForm!: FormGroup;

  constructor(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

}
