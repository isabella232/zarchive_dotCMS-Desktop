import {Component} from "@angular/core";
import {Treeable} from "../treeable/shared/treeable.model";
import {Subscription} from "rxjs";
import {SiteBrowserState} from "../util/site-browser.state";
import {FileSystemService} from "../util/filesystem.service";
import {LoggerService} from "../util/logger.service";
import {SiteDatatableService} from "./site-datatable.service";
import {NotificationService} from "../util/notification.service";
import {SiteBrowserService} from "../util/site-browser.service";
import {Folder} from "../treeable/shared/folder.model";

@Component({
    selector: 'site-datatable',
    template: require('./site-datatable.html'),
    styles: [require('./../app.css')]
})
export class SiteDatatableComponent {

    siteName: string;
    treeables: Treeable[];
    subscription: Subscription;

    constructor(private updateService: SiteBrowserState,
                private fsService: FileSystemService,
                private log: LoggerService,
                private siteBrowserService: SiteBrowserService,
                private messageService: NotificationService) {

        this.siteName = updateService.getSelectedSite();
        if (updateService.getURI()) {
            this.loadFolder(updateService.getURI())
        }
        ;
        this.subscription = updateService.currentSite
            .subscribe(siteName => {
                if (siteName) {
                    this.loadSite(siteName)
                }
            });
        this.subscription = updateService.currentURI
            .subscribe(uri => {
                if (uri) {
                    this.loadFolder(uri);
                }
            });
        setTimeout(() => {
        }, 100)
    }

    doubleClick(event){
        if(event.data.type!='folder'){return;}
        let pathName: string = (<string>event.data.path);
        pathName = pathName.slice(0, pathName.length - 1);
        pathName = pathName.slice(pathName.lastIndexOf("/") + 1, pathName.length)
        this.updateService.changeFolder(pathName);
        this.updateService.changeURI(event.data.path);
        let folder : Folder = event.data;
        let uri = this.updateService.getURI();
        if(!uri){uri="";}
        this.loadFolder(folder.path);
        setTimeout(() => {
        }, 100)
    }

    selectTreeable(event){
        this.updateService.changeTreeable(event.data);
    }

    loadFolder(uri : string) {
        this.siteBrowserService.getTreeableAssetsUnderFolder(this.siteName,uri)
            .subscribe((treeables: Treeable[]) => this.treeables=treeables)
        setTimeout(() => {}, 100);
    }

    loadSite(siteName: string) {
        this.siteName = siteName;
        this.siteBrowserService.getTreeableAssetsUnderSite(siteName)
            .subscribe((treeables: Treeable[]) => this.treeables=treeables)
        setTimeout(() => {}, 100)
    }

}