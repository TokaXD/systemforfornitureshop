import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';

@Component({
  selector: 'app-login-system',
  standalone: true,
  imports: [DefaultLoginLayoutComponent],
  templateUrl: './login-system.component.html',
  styleUrl: './login-system.component.scss'
})
export class LoginSystemComponent {

}
