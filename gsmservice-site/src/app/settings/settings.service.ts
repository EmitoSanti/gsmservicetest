import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestBaseService } from '../tools/rest.tools';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService extends RestBaseService {   
    private base_url = environment.backEndServerUrl;

    constructor(private http: HttpClient) {
        super();
    }

    generateNewCode(): Observable<any> {
        return this.http
            .get(this.base_url + 'google/newcode', this.getRestHeader())            
            .pipe(
                tap(
                    (resp) => {
                        console.log("resp: " + JSON.stringify(resp));
                        return resp;
                    },
                    error => {
                        console.log("error: " + JSON.stringify(error));
                        this.handleError;
                    }
                )
            );
    }

    verifyAuthorization(): Observable<any> {
        return this.http
            .get(this.base_url + 'google/authorize', this.getRestHeader())            
            .pipe(
                tap(
                    (resp) => {
                        console.log("resp: " + JSON.stringify(resp));
                        return resp;
                    },
                    error => {
                        console.log("error: " + JSON.stringify(error));
                        this.handleError;
                    }
                )
            );
    }

    startMigration(): Observable<any> {
        return this.http
            .get(this.base_url + 'google/startmigration', this.getRestHeader())            
            .pipe(
                tap(
                    (resp) => {
                        console.log("resp: " + JSON.stringify(resp));
                        return resp;
                    },
                    error => {
                        console.log("error: " + JSON.stringify(error));
                        this.handleError;
                    }
                )
            );
    }
}
