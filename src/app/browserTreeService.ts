import {Inject} from "@angular/core";
import {Http, Response} from "@angular/http";
import {TreeNode} from "primeng/components/common/api";
import {HttpClient} from "./httpService";
import {Observable} from "rxjs";

@Inject("http")
@Inject("_httpClient")
export class BrowserTreeService {

    constructor
    (
        private http: Http,
        private _httpClient: HttpClient
    )
    {
        this.http = http;
        this._httpClient = _httpClient;
    }

    getRoot(hostName : String){
        return this._httpClient.get('http://localhost:8080/api/v1/browsertree/sitename/' + hostName + '/uri//')
            .toPromise()
            .then((res: Response) => this.extractDataFilter(res));
    }

    getFolder(hostName : String,uri : String){
        return this._httpClient.get('http://localhost:8080/api/v1/browsertree/sitename/' + hostName + '/uri/' + uri)
            .toPromise()
            .then((res: Response) => this.extractDataFilter(res));
    }

    private extractDataFilter(res: Response): TreeNode[] {
        let assets : TreeNode[] = [];
        let obj = JSON.parse(res.text());
        let results : any[] = obj.entity.result;
        // console.log(results);
        for (let i = 0; i < results.length; i++) {
            let r : any = results[i];
            let leaf = true;
            if(r.type=='folder'){
                leaf = false;
            }else if(r.type=='file_asset'){
                r.type = 'file';
            }
            let t  : TreeNode = {
                data : r,
                leaf :leaf
            }
            t.data.modDate = new Date(<string>t.data.modDate).toISOString().split('T')[0];
            // console.log(t);
            assets[i] = t;
        }
        // console.log(assets);
        return assets;
    }

    private handleError(error: any) {
        // we need use a remote logging infrastructure at some point
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        let myNotification: Notification;
        if (errMsg) {
            console.log(errMsg);
            myNotification = new Notification('Error', {
                body: 'There was an error; please try again : ' + errMsg
            });
            return Observable.throw(errMsg);
        }
    }

    getFiles() {
        return this.http.get('src/assets/data/files.json')
            .toPromise()
            .then(res => <TreeNode[]> res.json().data)
            .then(data => { return data; });
    }

    getLazyFiles() {
        return this.http.get('src/assets/data/files-lazy.json')
            .toPromise()
            .then(res => <TreeNode[]> res.json().data)
            .then(data => { console.log(data);return data; });
    }

    getFilesystem() {
        return this.http.get('src/assets/data/filesystem.json')
            .toPromise()
            .then(res => <TreeNode[]> res.json().data)
            .then(data => { return data; });
    }

    getLazyFilesystem() {
        return this.http.get('src/assets/data/filesystem-lazy.json')
            .toPromise()
            .then(res => <TreeNode[]> res.json().data)
            .then(data => { console.log(data);return data; });
    }
}