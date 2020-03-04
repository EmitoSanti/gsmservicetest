import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestBaseService } from '../tools/rest.tools';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends RestBaseService {
    public usuarioLogueado: User;

    constructor(private http: HttpClient) {
        super();
    }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    getConfig() {
        console.log("getConfig");
        return this.http.get('http://localhost:3000/v1/user/getart');
    }
    login(username: string, password: string): Observable<User> {
        const data = {
            login: username,
            password: password
        };
        localStorage.removeItem('auth_token');

        return this.getPrincipal();
    }

    changePassword(currentPassword: string, newPassword: string): Observable<void> {
        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };

        return null;
    }

    logout(): Promise<string> {
        return null;
    }

    getPrincipal(): Observable<any> {
        return null;
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
