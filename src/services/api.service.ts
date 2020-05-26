import { Observable } from 'rxjs';
import BaseRequestModel from '../utils/base-request-model';
import { Body } from '../utils/types';

class ApiService {
    private route: string;
    private form: Body;

    constructor(route: string, form?: Body) {
        this.route = route;
        this.form = form;
    }

    //get request
    public get(): Observable<any> {
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };
        const newBase = new BaseRequestModel(this.route, 'GET', headers);
        return newBase.request();
    }
    // post request
    public post(): Observable<any> {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
        const newBase = new BaseRequestModel(this.route, 'POST', headers, this.form)
        return newBase.request();
    }

}

export default ApiService;