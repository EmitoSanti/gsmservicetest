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
    public loggedInUser;

    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit(): void {
        this.token = 'bearer ' + localStorage.getItem('auth_token');
        this.authService.getPrincipal().subscribe( userCurrent => this.loggedInUser = userCurrent);
    }
}
