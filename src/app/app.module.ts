import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './start/register/register.component';
import { LoginComponent } from './start/login/login.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainComponent } from './page/main/main.component';
import { ProfileComponent } from './page/profile/profile.component';
import { WorkersComponent } from './page/workers/workers.component';
import { MyactivityComponent } from './page/myactivity/myactivity.component';
import { AddclientComponent } from './modal/addclient/addclient.component';
import { AddactivityComponent } from './modal/addactivity/addactivity.component';
import { AddcenterComponent } from './modal/addcenter/addcenter.component';
import { AdduserComponent } from './modal/adduser/adduser.component';
import { CenterComponent } from './page/center/center.component';
import { ActivityComponent } from './page/activity/activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InfoActivityComponent } from './page/info-activity/info-activity.component';
import { VerActivityComponent } from './page/ver-activity/ver-activity.component';
import { ReassingComponent } from './modal/reassing/reassing.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Error404Component } from './page/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    MainComponent,
    ProfileComponent,
    WorkersComponent,
    MyactivityComponent,
    AddclientComponent,
    AddactivityComponent,
    AddcenterComponent,
    AdduserComponent,
    CenterComponent,
    ActivityComponent,
    InfoActivityComponent,
    VerActivityComponent,
    ReassingComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
