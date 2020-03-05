import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as _ from 'lodash';
// https://angular.io/guide/http#observables-and-operators
export class RestBaseService {
    protected handleError(error: HttpErrorResponse | any) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');

        /*let errMsg: string;
        if (error.error instanceof ErrorEvent) { // revisar 
        if (error.status === 0) {
            return Promise.reject({ error: 'No se puede conectar con el servidor.' });
        }
        const body = error || '';
        return Promise.reject(body);
        } else {
        errMsg = error.message ? error.message : error.toString();
        return Promise.reject({ 'error': errMsg });
        }*/
    }

    protected getRestHeader(moreHeaders?: any) {
        let token = localStorage.getItem('auth_token');
        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${token}`);
        if (moreHeaders) {
            console.log("moreHeaders: " + JSON.stringify(moreHeaders));
            _.forEach(moreHeaders, function(valueH, keyH) {
                console.log(keyH+ ' ' + valueH);
                headers = headers.set(keyH,valueH);
            });
        }
        const options = { headers: headers, withCredentials: true };
        /*
        : HttpRequest {
        const params = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }; 
        const url = "";
        
        const options = new RequestOptions({ headers: headers, withCredentials: true });
        const options = new HttpRequest("",url,{ headers: headers, withCredentials: true });*/
        console.log("getRestHeader: " + JSON.stringify(options));
        return options;
    }
}
