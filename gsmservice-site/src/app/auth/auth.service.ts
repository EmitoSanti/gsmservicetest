import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestBaseService } from '../tools/rest.tools';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService extends RestBaseService {
    public usuarioLogueado: Observable<User>;

    // https://jasonwatmore.com/post/2019/08/06/angular-8-role-based-authorization-tutorial-with-example
    // https://morioh.com/p/d7e15ce511a7
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private base_url = environment.backEndServerUrl;

    constructor(private http: HttpClient) {
        super();
        // this.getGetPrincipal();
        console.log("AuthService constructor");
        
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
    }
    // async getGetPrincipal() {
    //     console.log("getGetPrincipal");
    //     await this.getPrincipal().subscribe(data => {
    //         console.log("aaaaa: " + JSON.stringify(data));            
    //         return data;
    //     });
    // }

    public get currentUserValue(): User {
        console.log("currentUserValue");
        return this.currentUserSubject.value;
    }
    getPrincipal(): Observable<User> {
        console.log("getPrincipal");
            return this.http.get<User>(this.base_url + 'users/current', this.getRestHeader())
                .pipe(
                    tap(
                        (data: User) => {
                            console.log("getPrincipal data: " + JSON.stringify(data));
                            this.currentUserSubject.next(data);
                            console.log("currentUserValue(): " + JSON.stringify(this.currentUserValue));
                            return data;
                        }
                    ),
                    catchError(null)
                );
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
                        console.log("login response: " + JSON.stringify(response));
                        localStorage.setItem('auth_token', response.token);
                        localStorage.setItem('currentUser', JSON.stringify(response));
                        console.log("login localStorage: " + JSON.stringify(localStorage));
                    },
                    error => {
                        console.log("error: " + JSON.stringify(error));
                        localStorage.removeItem('auth_token');
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
                        this.currentUserSubject.next(null);
                        return '';
                    },
                    () => {
                        localStorage.removeItem('auth_token');
                        this.currentUserSubject.next(null);
                        this.handleError;
                    }
                )
            );
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
