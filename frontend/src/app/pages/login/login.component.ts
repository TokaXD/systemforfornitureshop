import { Component } from '@angular/core';
import { MatLine } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatLine, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true

  email = new FormControl('', [Validators.required, Validators.email]);

  name = new FormControl('', [Validators.required])

  emailErrorMessage = '';
  nameErrorMessage = '';
  imageSrc = 'assets/Tablet_login.gif';

  private imageUpdateInterval: any;

  ngOnInit(): void {
    this.startImageUpdate();
  }

  ngOnDestroy(): void {
    clearInterval(this.imageUpdateInterval);
  }

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.name.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateNameErrorMessage())
  }


  updateEmailErrorMessage(){
    if(this.email.hasError('required')){
      this.emailErrorMessage = 'Este Campo Precisa De Um Valor'
    } else if(this.email.hasError('email')){
      this.emailErrorMessage = 'Email Não é Valido';
    } else {
      this.emailErrorMessage = '';
    }
  }

  updateNameErrorMessage() {
    if (this.name.hasError('required')) {
      this.nameErrorMessage = 'Este Campo Precisa De Um Valor';
    } else {
      this.nameErrorMessage = '';
    }
  }


  startImageUpdate() {
    this.imageUpdateInterval = setInterval(() => {
      this.updateImage();
    }, 20000); // 20000 ms = 20 seconds
  }

  updateImage() {
    // Suponha que você tenha várias imagens para alternar
    const images = ['assets/Tablet_login.gif'];
    const currentIndex = images.indexOf(this.imageSrc);
    const nextIndex = (currentIndex + 1) % images.length;
    this.imageSrc = images[nextIndex];
  }

}

