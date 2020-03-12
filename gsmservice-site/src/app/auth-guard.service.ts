import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
        if (this.authService.usuarioLogueado) {
            console.log("canActivate: " + JSON.stringify(this.authService.usuarioLogueado));
            return true;
        } else {
            debugger;
            this.router.navigate(['/']);
            return false;
        }
    }
}