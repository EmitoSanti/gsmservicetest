import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { BasicFromGroupController } from '../../tools/error.form';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasicFromGroupController {
    hide = true;
    loginForm: FormGroup;
    public usuarioLogueado;
    constructor(private authService: AuthService, private router: Router) {
        super();
    }
    ngOnInit(): void {
        this.loginForm = new FormGroup({
            'user': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
            'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
        });
    }

    get user() { return this.loginForm.get('user'); }
    get password() { return this.loginForm.get('password'); }
    async submitForm() {
        this.cleanRestValidations();
        this.usuarioLogueado = await this.authService.login(this.loginForm.get('user').value, this.loginForm.get('password').value)
            .subscribe(
                () => { 
                    this.authService.getPrincipal().subscribe(
                        (data: User) => { // Success
                            return data;
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
