import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RestBaseService } from '../tools/rest.tools';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class ArticlesService extends RestBaseService {
	private base_url = environment.backEndServerUrl;
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
}