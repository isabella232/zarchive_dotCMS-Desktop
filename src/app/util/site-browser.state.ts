import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs";
import {MenuItem} from "primeng/components/common/api";
import {Treeable} from "../treeable/shared/treeable.model";

@Injectable()
export class SiteBrowserState {

    private currentSiteSubject : BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private currentFolderSubject : BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private currentURISubject : BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private currentTreeableSubject : BehaviorSubject<Treeable> = new BehaviorSubject<Treeable>(null);

    currentSite = this.currentSiteSubject.asObservable();
    currentFolder = this.currentFolderSubject.asObservable();
    currentURI = this.currentURISubject.asObservable();
    currentTreeable = this.currentTreeableSubject.asObservable();

    changeSite(siteName: string) {
        this.currentSiteSubject.next(siteName);
    }

    getSelectedSite() : string {
        return <string>this.currentSiteSubject.getValue();
    }

    changeFolder(folderName: string) {
        this.currentFolderSubject.next(folderName);
    }

    getSelectedFolder() : string {
        return <string>this.currentFolderSubject.getValue();
    }

    changeURI(uri: string) {
        this.currentURISubject.next(uri);
    }
    getURI() : string {
        return <string>this.currentURISubject.getValue();
    }

    changeTreeable(treeable: Treeable) {
        this.currentTreeableSubject.next(treeable);
    }

    getSelectedTreeable() : Treeable {
        return <Treeable>this.currentTreeableSubject.getValue();
    }

}