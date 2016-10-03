import {Inject} from "@angular/core";
import {Response} from "@angular/http";
import {HttpClient} from "../../util/http.service";
import {Observable} from "rxjs";
import {Treeable} from "../../treeable/shared/treeable.model";
import {Folder} from "../../treeable/shared/folder.model";
import {File} from "../../treeable/shared/file.model";
import {NotificationService} from "../../util/message.service";

@Inject("httpClient")
export class SiteBrowserService {

    constructor
    (
        private httpClient: HttpClient,
        private notificationService: NotificationService
    )
    {
        this.httpClient = httpClient;
    }

    getTreeableAssetsUnderSite(siteName: String): Observable < Treeable[] > {
        return this.httpClient.get('http://localhost:8080/api/v1/browsertree/sitename/' + siteName + '/uri//')
            .map((res: Response) => this.extractDataFilter(res))
            .catch(error => this.handleError(error));
    }

    getTreeableAssetsUnderFolder(hostName: String, uri: String): Observable < Treeable[] > {
        return this.httpClient.get('http://localhost:8080/api/v1/browsertree/sitename/' + hostName + '/uri/' + uri)
            .map((res: Response) => this.extractDataFilter(res))
            .catch(error => this.handleError(error));
    }

    private
    extractDataFilter(res: Response): Treeable[] {
        let treeables: Treeable[] = [];
        let obj = JSON.parse(res.text());
        let results: any[] = obj.entity.result;
        for (let i = 0; i < results.length; i++) {
            let r: any = results[i];
            let t: Treeable;
            if (r.type == 'folder') {
                t = new Folder();
            } else if (r.type == 'file_asset') {
                t = new File();
            }
            t = r;
            treeables[i] = t;
        }
        return treeables;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        if (errMsg) {
            console.log(errMsg);
            this.notificationService.displayErrorMessage("There was an error; please try again : " + errMsg)
            return Observable.throw(errMsg);
        }
    }
}