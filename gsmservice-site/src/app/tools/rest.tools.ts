import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
export class RestBaseService {
 // https://angular.io/guide/http#observables-and-operators
  protected handleError(error: any) {
    let errMsg: string;
    if (error instanceof HttpResponse) {
      if (error.status === 0) {
        return Promise.reject({ error: 'No se puede conectar con el servidor.' });
      }
      const body = error || '';
      return Promise.reject(body);
    } else {
      errMsg = error.message ? error.message : error.toString();
      return Promise.reject({ 'error': errMsg });
    }
  }

  protected getRestHeader(moreHeaders?: any): any {
    const params = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('auth_token')
    };

    if (moreHeaders) {
      Object.assign(params, moreHeaders);
    }

    const headers = new HttpHeaders(params);
    const url = "";
    const options = new HttpRequest('GET',url,{ headers: headers, withCredentials: true });
    return options;
  }
}
