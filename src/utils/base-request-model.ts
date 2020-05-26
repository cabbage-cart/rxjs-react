import { Observable } from "rxjs";
import { Method, _Headers, Body } from "./types";

const baseUrl = 'http://dummy.restapiexample.com/api/v1';
interface Props {
    url: string;
    method?: Method;
    headers: _Headers,
    body?: Body
}

export default class BaseRequestModel implements Props {
    url: string;
    method: Method;
    headers: _Headers;
    body: Body;

    constructor(url: string, method: Method, headers: _Headers, body?: Body) {
        this.url = url;
        this.method = method || "GET";
        this.headers = headers || {};
        this.body = body;
    }

    request(): Observable<any> {
        return new Observable(observer => {
            fetch(
                `${baseUrl}${this.url}`,
                {
                    method: this.method as any,
                    headers: this.headers,
                    body: this.body
                }).then((r: any) => {
                    return r.json()
                }).then((data: any) => {
                    observer.next(data);
                    observer.complete();
                }).catch((e: any) => {
                    observer.error(e);
                })
        });
    }
}