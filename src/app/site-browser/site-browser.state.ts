import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SiteBrowserState {

    // Observable string sources
    private siteSource = new Subject<string>();
    // Observable string streams
    siteSource$ = this.siteSource.asObservable();
    changeSite(siteName: string) {
        this.siteSource.next(siteName);
    }

    // Observable string sources
    private folderSource = new Subject<string>();
    // Observable string streams
    folderSource$ = this.folderSource.asObservable();
    changeFolder(folderName: string) {
        this.folderSource.next(folderName);
    }

    // Observable string sources
    private breadCrumbFolderSource = new Subject<string>();
    // Observable string streams
    breadCrumbFolderSource$ = this.breadCrumbFolderSource.asObservable();
    changeBreadCrumbFolder(uri: string) {
        this.breadCrumbFolderSource.next(uri);
    }

}