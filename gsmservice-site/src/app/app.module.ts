import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoggedIn, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthService } from './auth/auth.service';
import { InfoComponent } from './auth/info.component';
import { LoginComponent } from './auth/login.component';
import { NewPasswordComponent } from './auth/new.password.component';
import { NewUserComponent } from './auth/new.user.component';
import { UsersComponent } from './auth/users.component';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolbarComponent,
    LoginComponent,
    NewUserComponent,
    WelcomeComponent,
    InfoComponent,
    NewPasswordComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
