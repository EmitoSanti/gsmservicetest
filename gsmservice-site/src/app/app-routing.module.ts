import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './auth/auth.service';
import { InfoComponent } from './auth/info.component';
import { LoginComponent } from './auth/login.component';
import { NewUserComponent } from './auth/new.user.component';
import { NewPasswordComponent } from './auth/new.password.component';
import { UsersComponent } from './auth/users.component';

export class LoggedIn implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
      if (this.auth.usuarioLogueado) {
          return true;
      } else {
          this.router.navigate(['/']);
          return false;
      }
  }
}

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent, canActivate: [LoggedIn] },
  { path: 'password', component: NewPasswordComponent, canActivate: [LoggedIn] },
  { path: 'registrarse', component: NewUserComponent },
  { path: 'users', component: UsersComponent, canActivate: [LoggedIn] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
