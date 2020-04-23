import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';

import { CustomMaterialModule } from './material.modules'

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
import { ServicesComponent } from './services/services.component';
import { ServicesService } from './services/services.service';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';

@NgModule({
    declarations: [
        AppComponent,
        // ToolbarComponent,
        LoginComponent,
        NewUserComponent,
        WelcomeComponent,
        MenuComponent,
        InfoComponent,
        NewPasswordComponent,
        UsersComponent,
        ArticlesComponent,
        ServicesComponent,
        SettingsComponent
    ],
    imports: [
        CustomMaterialModule,
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ObserversModule,
        PlatformModule,
        ToastrModule.forRoot()
    ],
    providers: [AuthGuardService, AuthService, ArticlesService, ServicesService, SettingsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
