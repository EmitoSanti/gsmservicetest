import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { BasicFromGroupController } from '../../tools/error.form';

@Component({
    selector: 'new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent extends BasicFromGroupController {
    form = new FormGroup({
        login: new FormControl('', [Validators.required]),
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        newPassword1: new FormControl('', [Validators.required]),
    }, (formGroup: FormGroup) => {
        return this.validarPasswords(formGroup);
    });

    constructor(private authService: AuthService, private router: Router) {
        super();
        this.form.get('login').setValue(this.authService.currentUserValue.login);
    }

    validarPasswords(group: FormGroup) {
        if (group.controls.newPassword1.dirty && group.controls.newPassword.value !== group.controls.newPassword1.value) {
            this.processRestValidations({
                messages: [
                    {
                        path: 'newPassword1',
                        message: 'Los passwords no son iguales',
                    }
                ]
            });
            return this.errors.values;
        }
        return null;
    }

    submitForm() {
        this.authService
            .changePassword(
                this.form.value
            )
            .subscribe(
                () => {
                    this.cleanRestValidations();
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
}
