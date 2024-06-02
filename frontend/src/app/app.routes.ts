import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'register' },
    { path: 'register', component: LoginComponent },
];
