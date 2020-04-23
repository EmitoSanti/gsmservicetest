import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { BasicFromGroupController } from '../../tools/error.form';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasicFromGroupController {
    hide = true;
    loginForm: FormGroup;

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
    submitForm() {
        this.cleanRestValidations();
        this.authService.login(this.loginForm.get('user').value, this.loginForm.get('password').value)
        .pipe(debounceTime(3000), )
        .subscribe(
                (response) => {
                    console.log("apa:" + JSON.stringify(response));
                    if(response){
                        this.router.navigate(['/'])
                        .then(() => {
                            window.location.reload(); // arreglo provisorio
                        });
                    }
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
}
