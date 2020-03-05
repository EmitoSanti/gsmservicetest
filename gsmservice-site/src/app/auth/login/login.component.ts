import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { BasicFromGroupController } from '../../tools/error.form';

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasicFromGroupController {
    form = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private authService: AuthService, private router: Router) {
        super();
    }

    submitForm() {
        this.cleanRestValidations();
        this.authService.login(this.form.get('login').value, this.form.get('password').value)
            .subscribe(
                () => { 
                    this.authService.getPrincipal().subscribe(
                        (data: User) => { // Success
                            return this.authService.usuarioLogueado = data;
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                    this.router.navigate(['/']);
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
}
