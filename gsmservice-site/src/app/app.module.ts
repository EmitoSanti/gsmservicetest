import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthService } from './auth/auth.service';
import { ArticlesService } from './articles/articles.service';
import { InfoComponent } from './auth/info/info.component';
import { LoginComponent } from './auth/login/login.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { NewUserComponent } from './auth/new-user/new-user.component';
import { UsersComponent } from './auth/users/users.component';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        // ToolbarComponent,
        LoginComponent,
        NewUserComponent,
        WelcomeComponent,
        InfoComponent,
        NewPasswordComponent,
        UsersComponent,
        ArticlesComponent        
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule
    ],
    providers: [AuthGuardService, AuthService, ArticlesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
