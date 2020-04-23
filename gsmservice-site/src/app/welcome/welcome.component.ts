import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    currentUser: User;
    constructor(private authService: AuthService) {
        this.currentUser = this.authService.currentUserValue;
    }
    ngOnInit(): void {
        // this.getCurrentUser();
        console.log("WelcomeComponent: " + JSON.stringify(this.currentUser));
    }

    getCurrentUser() {
        console.log("WelcomeComponent getCurrentUser")
        if (localStorage.getItem('auth_token')) {
            this.authService.getPrincipal()
			.subscribe( 
				(response) => {
					this.currentUser = this.authService.currentUserValue;
					console.log("response : " + JSON.stringify(response));
				},((error: any) => {
					console.log(error);
					//return of("Datos no encontrados");
				})
		    );
        }
		 
	}
}
