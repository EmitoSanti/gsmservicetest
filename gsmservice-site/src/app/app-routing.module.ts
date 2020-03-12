import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { InfoComponent } from './auth/info/info.component';
import { LoginComponent } from './auth/login/login.component';
import { NewUserComponent } from './auth/new-user/new-user.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { UsersComponent } from './auth/users/users.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '', component: WelcomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
    { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
    { path: 'info', component: InfoComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
    { path: 'password', component: NewPasswordComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
    { path: 'registrarse', component: NewUserComponent, runGuardsAndResolvers: 'always' },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
    { path: 'services', component: ServicesComponent, canActivate: [AuthGuardService], runGuardsAndResolvers: 'always' },
    { path: '**', component: WelcomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation:  "reload",  enableTracing: false})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
