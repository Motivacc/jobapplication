import {Injectable} from '@angular/core';
import { Http, Headers,Response, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable }  from 'rxjs/Observable';

@Injectable() 
export class HomeService {
   
     API = 'http://localhost:3000';
    constructor(
        private _http: Http,
    ) {}


    getAllApplicants() {
        return this._http.get(`${this.API}/applicants`)
        .map(res => res.json())
        .catch(this.handleError);
    }

    addApplicants(applicant, isDelete = false) {
        let body = JSON.stringify(applicant);
        let headers = new Headers();
        let options = new RequestOptions({headers: headers});
        headers.append('Content-Type', 'application/json');
        return this._http.post(`${this.API}/applicants`, body, options)
        .map(res => res.json())
        .catch(this.handleError);
    }


    private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
    }

    private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
    }
}