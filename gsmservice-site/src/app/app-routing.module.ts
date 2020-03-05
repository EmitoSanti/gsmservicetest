import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { InfoComponent } from './auth/info/info.component';
import { LoginComponent } from './auth/login/login.component';
import { NewUserComponent } from './auth/new-user/new-user.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { UsersComponent } from './auth/users/users.component';

const routes: Routes = [
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'info', component: InfoComponent, canActivate: [AuthGuardService] },
    { path: 'password', component: NewPasswordComponent, canActivate: [AuthGuardService] },
    { path: 'registrarse', component: NewUserComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
