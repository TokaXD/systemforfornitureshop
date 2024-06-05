import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginSystemComponent } from './pages/login-system/login-system.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginSystemComponent },
    { path: 'register', component: LoginComponent },
];
