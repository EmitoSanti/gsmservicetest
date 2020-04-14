import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService, User } from './auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    public isLogin: boolean = false;
    constructor(private router: Router, private authService: AuthService) {
        // this.authService.getPrincipal().subscribe(
        //     (data: User) => { // Success
        //         console.log("canActivate data: " + JSON.stringify(data));
        //         return this.isLogin = true;
        //     },
        //     (error) => {
        //         console.error(error);
        //     }
        // );
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
        console.log("canActivate");
       
        if (this.authService.usuarioLogueado) {
            console.log("canActivate: " + JSON.stringify(this.authService.usuarioLogueado));
            return true;
        } else {
            console.log("Else canActivate");
            this.router.navigate(['/']);
            return false;
        }
    }
}