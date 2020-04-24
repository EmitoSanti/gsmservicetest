import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BasicFromGroupController } from '../../tools/error.form';
import { debounceTime } from 'rxjs/operators';

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
        console.log("submitForm");
        this.authService
            .newUser({
                name: this.form.get('name').value,
                login: this.form.get('login').value,
                password: this.form.get('password').value
            })
            .pipe(debounceTime(3000), )
            .subscribe(
                () => {
                    this.cleanRestValidations();
                    this.router.navigated = false;
                    this.router.navigate(['/'])
                        .then(() => {
                            window.location.reload(); // arreglo provisorio
                        });
                },
                (error) => {
                    this.cleanRestValidations();
                    this.processRestValidations(error);
                }
            );
    }
}
