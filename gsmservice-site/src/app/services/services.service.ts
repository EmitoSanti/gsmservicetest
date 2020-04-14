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

    getByQuery(query: any): Observable<any> {
        const encodeGetParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
        const result = Object.keys(query).map((key:string) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');
        const params = query;
        console.log("getStat");
        console.log("Encondeo" + encodeGetParams(params))
        console.log("articles");
        return this.http.get(this.base_url + 'articles/getarticles/?' + encodeGetParams(params), this.getRestHeader())
        .pipe(
            tap(
                (response: any) => {
                    // console.log("response: " + JSON.stringify(response));
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

    getBrands(query: any): Observable<any> {
        const encodeGetParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
        const result = Object.keys(query).map((key:string) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');
        const params = query;
        console.log("getBrands Servicio: " + JSON.stringify(query));
        return this.http.get(this.base_url + 'articles/getbrands/?' + encodeGetParams(params), this.getRestHeader(query))
        .pipe(
            tap(
                (response: any) => {
                    // console.log("response: " + JSON.stringify(response));
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
