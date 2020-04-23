import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService, User } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    public isLogin: boolean = false;
    userCanActivate;
    constructor(private router: Router, private authService: AuthService) {
        console.log("AuthGuardService");
        this.userCanActivate = this.authService.currentUserValue;
            if (localStorage.getItem('auth_token')) {
                this.authService.getPrincipal()
                .subscribe( 
                    (response) => {
                        console.log("response : " + JSON.stringify(response));
                        // return response;
                        this.userCanActivate = this.authService.currentUserValue;
                    }
            );
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("canActivate userCanActivate: " + JSON.stringify(this.userCanActivate));
        const currentUser = this.authService.currentUserValue;
        console.log("canActivate currentUser: " + JSON.stringify(currentUser));
        if (currentUser) { // poner mas validaciones https://jasonwatmore.com/post/2019/08/06/angular-8-role-based-authorization-tutorial-with-example
            console.log("canActivate true");
            return true;
        }
        console.log("canActivate false");
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}