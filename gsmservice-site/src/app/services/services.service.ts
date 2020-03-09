import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestBaseService } from '../tools/rest.tools';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ServicesService extends RestBaseService {
    private base_url = environment.backEndServerUrl;

    constructor(private http: HttpClient) {
        super();
    }

    articles(query: any): Observable<any> {
        console.log("articles");

        return this.http
            .get(
                this.base_url + 'articles/getart',
                this.getRestHeader(query)
            ).pipe(
                tap(
                    (response: any) => {
                        console.log("response: " + JSON.stringify(response));
                        return response;
                    },
                    (error) => {
                        console.log("error: " + JSON.stringify(error));
                        this.handleError;
                    }
                )
            );
            // .pipe(catchError(this.handleError)); //this.handleError.bind(this)
    }
}

export interface RegistrarUsuario {
    login: string;
    name: string;
    password: string;
}

export interface Article {
    id: string;
    name: string;
    login: string;
    permissions: string[];
}
