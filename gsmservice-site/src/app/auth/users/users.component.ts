import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BasicFromGroupController } from '../../tools/error.form';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BasicFromGroupController implements OnInit {
    users: User[];

    editPermisos: User;

    form = new FormGroup({
        permisos: new FormControl('', [Validators.required]),
    });

    constructor(private authService: AuthService, private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.getUsers();
    }

    editarPermisos(user: User) {
        this.form.get('permisos').setValue('');
        this.editPermisos = user;
    }
    cancelarPermisos() {
        this.editPermisos = undefined;
    }
    grantPermisos() {
        this.authService.grant(this.editPermisos.id, this.form.get('permisos').value.split(','))
            .subscribe(
                (response) => {
                    this.getUsers();
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
    revokePermisos() {
        this.authService.revoke(this.editPermisos.id, this.form.get('permisos').value.split(','))
            .subscribe(
                (response) => {
                    this.getUsers();
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
    enableUser(id: string) {
        this.authService.enable(id)
            .subscribe(
                (response) => {
                    this.getUsers();
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
    disableUser(id: string) {
        this.authService.disable(id)
            .subscribe(
                (response) => {
                    this.getUsers();
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
    getUsers() {
        this.authService.getUsers()
            .subscribe(
                (response) => {
                    this.users = response;
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
}
