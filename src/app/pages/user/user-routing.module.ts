import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path : '', redirectTo : 'login', pathMatch : 'full'},
  { path : 'login', component: LoginComponent},
  { path : 'register', component: RegisterComponent},
  { path : 'profile', component : ProfileComponent},
  { path : 'forgot-password', component : ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
