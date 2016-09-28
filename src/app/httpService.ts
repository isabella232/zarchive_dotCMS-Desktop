import {Inject} from '@angular/core';
import {Http, Headers, Response, RequestMethod, RequestOptions} from '@angular/http';
import {Observable} from "rxjs";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Inject("http")
export class HttpClient {
    public progress$
    private progress
    private progressObserver

    constructor(private http: Http) {
        this.http = http;
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    createAuthorizationHeader(headers: Headers, username: String, password: String) {
        headers.append('Authorization', 'Basic ' +
            btoa(username + ':' + password));
    }

    get(url): Observable<Response> {
        // return Observable.create(observer => {
            let headers = new Headers();
            this.createAuthorizationHeader(headers, 'admin@dotcms.com', 'admin');
            return this.http.get(url, {
                headers: headers
            });
        // });
    }

    put(url: String, jsonData: Object) {
        let opts: RequestOptions = new RequestOptions();
        opts.method = RequestMethod.Put;
        opts.headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(opts.headers, 'admin@dotcms.com', 'admin');
        return this.http.put(url.toString(), JSON.stringify(jsonData), opts)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    filePut(url: String, files: File[], jsonData: Object): Observable<Object> {
        return Observable.create(observer => {
            let username = 'admin@dotcms.com';
            let password = 'admin';
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('json', JSON.stringify(jsonData));

            console.log(files[0]);
            formData.append("fileAsset", files[0]);
            // for (let i = 0; i < files.length; i++) {
            //     formData.append('fileAsset[]', files[i], files[i].name);
            // }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);

                this.progressObserver.next(this.progress);
            };

            xhr.open('PUT', url.toString(), true);
            xhr.setRequestHeader('Authorization', 'Basic ' +
                btoa(username + ':' + password))
            // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            console.log(formData);
            xhr.send(formData);
        });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}