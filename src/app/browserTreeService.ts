import {Inject} from "@angular/core";
import {Http, Response} from "@angular/http";
import {TreeNode} from "primeng/components/common/api";
import {HttpClient} from "./httpService";

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

    // getRoot(hostName : String){
    //     this._httpClient.get('http://localhost:8080/api/v1/sitename/' + hostName + '/uri//')
    //         .map((res: Response) => this.extractDataFilter(res))
    //         .subscribe(
    //             data => this.formatResult(data,event),
    //             err => this.handleError(err),
    //             () => console.log('done')
    //         );
    //     setTimeout(() => {}, 100)
    // }
    //
    // private extractDataDropdown(res: Response): Site[] {
    //     let obj = JSON.parse(res.text());
    //     console.log(obj);
    //     console.log(obj.entity.sites);
    //     console.log("Number of Hosts is " + obj.entity.sites.length);
    //     console.log("Host Name is " + obj.entity.sites[0].hostname);
    //     return obj.entity.sites;
    // }

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