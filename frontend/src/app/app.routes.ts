import { Routes } from '@angular/router';
import { LoginSystemComponent } from './pages/login-system/login-system.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginSystemComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: 'login' },
];
