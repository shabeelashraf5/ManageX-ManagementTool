import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { loggedGuard } from './core/guards/logged.guard';
import { loggedOutGuard } from './core/guards/logged-out.guard';
import { FrontComponent } from './features/front/front.component';
import { PasswordsComponent } from './features/passwords/passwords.component';
import { ResetpasswordComponent } from './features/resetpassword/resetpassword.component';
import { DispalypasswordComponent } from './features/dispalypassword/dispalypassword.component';
import { ErrorpageComponent } from './features/errorpage/errorpage.component';
import { WeatherComponent } from './features/weather/weather.component';
import { TodolistComponent } from './features/todolist/todolist.component';



export const routes: Routes = [
    
    {path: '', component: FrontComponent, canActivate: [loggedOutGuard]},
    {path: 'dashboard' , component: DashboardComponent, canActivate: [loggedGuard] },
    {path: 'login' , component: LoginComponent, canActivate: [loggedOutGuard]},
    {path: 'register' , component: RegisterComponent, canActivate: [loggedOutGuard]},
    {path: 'passwords', component: PasswordsComponent, canActivate: [loggedGuard]},
    {path: 'reset-password', component: ResetpasswordComponent, canActivate: [loggedOutGuard]},
    {path: 'update-password', component: DispalypasswordComponent, canActivate: [loggedOutGuard]},
    {path: 'weather', component: WeatherComponent, canActivate: [loggedGuard]},
    {path: 'todolist', component: TodolistComponent, canActivate: [loggedGuard]},
    {path: '**' , component: ErrorpageComponent}
];
