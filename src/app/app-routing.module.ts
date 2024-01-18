import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { IdParamGuard } from './guard/id-param-guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register/:id', component: LoginComponent, canActivate: [IdParamGuard]},
  {path: 'register', component: LoginComponent, canActivate: [IdParamGuard]},
  {path: 'confirmation/:id', component: RegisterUserComponent, canActivate: [IdParamGuard]},
  {path: 'confirmation', component: RegisterUserComponent}
  // {path: 'registerr', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
