import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
    selector: 'app-auth-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
    token: string;

    get loggedInUser(): User {
        return this.authService.usuarioLogueado;
    }

    ngOnInit(): void {
        this.token = 'bearer ' + localStorage.getItem('auth_token');
    }

    constructor(private authService: AuthService, private router: Router) { }
}
