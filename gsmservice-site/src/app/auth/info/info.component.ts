import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
    token: string;
    currentUser: User;

    constructor(private authService: AuthService, private router: Router) {
        this.currentUser = this.authService.currentUserValue;
    }
    ngOnInit(): void {
        this.token = 'bearer ' + localStorage.getItem('auth_token');
        this.getCurrentUser();
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
