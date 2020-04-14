import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    public usuarioLogueado;
    constructor(private authService: AuthService) {}
    ngOnInit(): void {
        this.authService.getPrincipal().subscribe( userCurrent => this.usuarioLogueado = userCurrent);
    }
}
