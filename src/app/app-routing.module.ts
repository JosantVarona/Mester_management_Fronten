import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './start/register/register.component';
import { LoginComponent } from './start/login/login.component';
import { MainComponent } from './page/main/main.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './page/profile/profile.component';
import { MyactivityComponent } from './page/myactivity/myactivity.component';
import { WorkersComponent } from './page/workers/workers.component';
import { CenterComponent } from './page/center/center.component';
import { ActivityComponent } from './page/activity/activity.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [

{
  path: '',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'home',
  component: HeaderComponent,
  canActivate: [AuthGuard],
  children:[
    {path: '' , component: MainComponent},
    {path: 'main' , component: MainComponent},
    {path: 'perfil' , component: ProfileComponent},
    {path: 'myactivity' , component: MyactivityComponent},
    {path: 'workers' , component: WorkersComponent},
    {path: 'center_client', component:CenterComponent},
    {path: 'center_activity', component:ActivityComponent}
  ]
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
