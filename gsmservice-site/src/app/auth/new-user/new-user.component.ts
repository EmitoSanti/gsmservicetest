import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasicFromGroupController } from '../../tools/error.form';

@Component({
    selector: 'new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent extends BasicFromGroupController {
    form = new FormGroup({
        login: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private authService: AuthService, private router: Router) {
        super();
     }

    submitForm() {
        this.cleanRestValidations();
        console.log("submitForm");
        this.authService
            .newUser({
                name: this.form.get('name').value,
                login: this.form.get('login').value,
                password: this.form.get('password').value
            })         
            .subscribe(
                () => { 
                    this.router.navigate(['/']);
                },
                (error) => {
                    this.processRestValidations(error);
                }
            );
    }
}
