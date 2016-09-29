import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BrowserTreeUpdateService {

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
}