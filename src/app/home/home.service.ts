import {Injectable} from '@angular/core';
import { Http, Headers,Response, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable }  from 'rxjs/Observable';

import {HOME} from './home';

@Injectable() 
export class HomeService {
   
     private base: string = 'http://localhost:3000/applicants';
    constructor(
        private _http: Http,
    ) {}


    getAllApplicants(): Observable<any> {
        return this._http.get(this.base)
        .map(res => res.json())
        .catch(this.handleError);
    }

    getApplicant(_id) {
        return this._http.get(this.base +_id)
        .map(res => res.json())
        .catch(this.handleError);
    }

    addApplicants(applicant:any): Observable<HOME[]> {
        //let body = JSON.stringify(applicants);
        let body = new URLSearchParams(applicant);
        let headers = new Headers();
        let options = new RequestOptions({headers: headers});
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.base , body, options )
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