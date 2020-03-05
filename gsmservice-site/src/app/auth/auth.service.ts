import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestBaseService } from '../tools/rest.tools';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends RestBaseService {
    public usuarioLogueado: User;
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
            // .pipe(catchError(this.handleError)); //this.handleError.bind(this)
    }

    changePassword(currentPassword: string, newPassword: string): Observable<void> {
        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };

        return null;
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
            return;
        } else {
            return this.http.get<User>(this.base_url + 'users/current', this.getRestHeader()).pipe(catchError(this.handleError));
            // .pipe(
            //     tap(
            //         (data) => {
            //             console.log("data: " + JSON.stringify(data));
            //             this.usuarioLogueado = data;
            //             return data as User;
            //         },
            //         (error) => {
            //             console.log("error: " + JSON.stringify(error));
            //             localStorage.removeItem('auth_token');
            //             this.usuarioLogueado = undefined;
            //             this.handleError;
            //         }
            //     )
            // );
        }
    }

    newUser(value: RegistrarUsuario): Observable<any> {
        return null;
    }

    getUsers(): Observable<any> {
        return null;
    }


    enable(id: string): Observable<any> {
        return null;
    }

    disable(id: string): Observable<any> {
        return null;
    }

    grant(id: string, permisos: string[]): Observable<any> {
        return null;
    }

    revoke(id: string, permisos: string[]): Observable<any> {
        return null;
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
