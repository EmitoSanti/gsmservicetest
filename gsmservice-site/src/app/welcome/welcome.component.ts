import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    constructor(private authService: AuthService) {}
    ngOnInit(): void {
        if (localStorage.getItem('auth_token')) { // debe estar en un servicio dedicado
            this.authService.getPrincipal().subscribe(
                (data: User) => { // Success
                    return this.authService.usuarioLogueado = data;
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }
    get usuarioLogueado(): User {
        return this.authService.usuarioLogueado;
    }
}
