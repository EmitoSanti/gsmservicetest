import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestBaseService } from '../tools/rest.tools';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends RestBaseService {
    public usuarioLogueado: Observable<User>;
    // public usuarioL = new EventEmitter();
    
    private base_url = environment.backEndServerUrl;

    constructor(private http: HttpClient) {
        super();
    }

    login(username: string, password: string): Observable<User> {
        console.log("login");
        const data = {
            login: username,
            password: password
        };
        localStorage.removeItem('auth_token');
        return this.http
            .post<User>(
                this.base_url + 'user/signin',
                data,
                this.getRestHeader()
            ).pipe(
                tap(
                    (response: any) => {
                        console.log("login response: " + JSON.stringify(response.token));
                        localStorage.setItem('auth_token', response.token);
                        console.log("login localStorage: " + JSON.stringify(localStorage));
                        return this.getPrincipal();
                    },
                    error => {
                        console.log("error: " + JSON.stringify(error));
                        localStorage.removeItem('auth_token');
                        this.usuarioLogueado = undefined;
                        this.handleError;
                    }
                )
            );
            // .pipe(catchError(this.handleError)); //this.handleError.bind(this)
    }

    changePassword(currentPassword: string, newPassword: string): Observable<void> {
        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };

        return this.http
            .post<User>(
                this.base_url + 'user/signin',
                data,
                this.getRestHeader()
            ).pipe(
                tap(
                    (response: any) => {
                        console.log("response: " + JSON.stringify(response));
                        return "New Password, OK";
                    },
                    error => {
                        console.log("error: " + JSON.stringify(error));
                        this.handleError;
                    }
                )
        );
    }

    logout() {
        return this.http
            .get(this.base_url + 'user/signout', this.getRestHeader())            
            .pipe(
                tap(
                    () => {
                        localStorage.removeItem('auth_token');
                        this.usuarioLogueado = undefined;
                        return '';
                    },
                    error => {
                        localStorage.removeItem('auth_token');
                        this.usuarioLogueado = undefined;
                        this.handleError;
                    }
                )
            );
    }

    getPrincipal(): Observable<any> {
        console.log("getPrincipal");
        console.log("this.usuarioLogueado: " + JSON.stringify(this.usuarioLogueado));
        console.log("localStorage: " + localStorage.getItem("auth_token") + " " + localStorage.length);
        if (this.usuarioLogueado) {
            console.log("getPrincipal if: " + JSON.stringify(this.usuarioLogueado));

            return this.usuarioLogueado;
        } else {
            console.log("getPrincipal else");
            return this.usuarioLogueado = this.http.get<User>(this.base_url + 'users/current', this.getRestHeader())
            .pipe(
                tap(
                    (data: User) => {
                        console.log(" getPrincipal data: " + JSON.stringify(data));
                        
                        return data;
                    },
                    (error) => {
                        console.log("error: " + JSON.stringify(error));
                        localStorage.removeItem('auth_token');
                        this.usuarioLogueado = undefined;
                        this.handleError;
                    }
                )
            );
        }
    }

    newUser(value: RegistrarUsuario): Observable<User> {
        console.log("newUser");
        return this.http
            .post<User>(
                this.base_url + 'user',
                value,
                this.getRestHeader()
            ).pipe(
                tap(
                    (response: any) => {
                        console.log("response: " + JSON.stringify(response.token));
                        localStorage.setItem('auth_token', response.token);
                        console.log("localStorage: " + JSON.stringify(localStorage));
                        return this.getPrincipal();
                    },
                    error => {
                        console.log("error: " + JSON.stringify(error));
                        localStorage.removeItem('auth_token');
                        this.usuarioLogueado = undefined;
                        this.handleError;
                    }
                )
            );
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.base_url + 'users', this.getRestHeader())
            .pipe(catchError(this.handleError));
    }

    enable(id: string): Observable<any> {
        return this.http
            .post(this.base_url + 'users/' + id + '/enable', {}, this.getRestHeader())
            .pipe(catchError(this.handleError));
    }

    disable(id: string): Observable<any> {
        return this.http
            .post(this.base_url + 'users/' + id + '/disable', {}, this.getRestHeader())
            .pipe(catchError(this.handleError));
    }

    grant(id: string, permisos: string[]): Observable<any> {
        const data = {'permissions': permisos};
        return this.http
            .post(this.base_url + 'users/' + id + '/grant', data, this.getRestHeader())
            .pipe(catchError(this.handleError));
    }

    revoke(id: string, permisos: string[]): Observable<any> {
        const data = {'permissions': permisos};
        return this.http
            .post(this.base_url + 'users/' + id + '/revoke', data, this.getRestHeader())
            .pipe(catchError(this.handleError));
    }
}

export interface RegistrarUsuario {
    login: string;
    name: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    login: string;
    permissions: string[];
}
