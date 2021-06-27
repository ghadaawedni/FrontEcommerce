import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './Component/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticateService} from './Services/authenticate.service';
import { AdministrationComponent } from './Component/administration/administration.component';
import {AuthInterceptor} from './Services/Auth/auth-interceptor';

const appRoutes: Routes = [
  { path : 'home' , component: HomeComponent},
  { path : 'login' , component: LoginComponent },
  { path : 'signup', component : SignupComponent },
  { path : 'administration' , component: AdministrationComponent},
  { path : '**'    , redirectTo:  '/login'  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
