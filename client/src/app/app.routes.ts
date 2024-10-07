import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { loggedGuard } from './core/guards/logged.guard';
import { loggedOutGuard } from './core/guards/logged-out.guard';
import { FrontComponent } from './features/front/front.component';


export const routes: Routes = [
    
    {path: '', component: FrontComponent, canActivate: [loggedOutGuard]},
    {path: 'dashboard' , component: DashboardComponent, canActivate: [loggedGuard] },
    {path: 'login' , component: LoginComponent, canActivate: [loggedOutGuard]},
    {path: 'register' , component: RegisterComponent, canActivate: [loggedOutGuard]}
];
