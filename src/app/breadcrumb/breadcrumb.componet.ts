import {MenuItem} from "primeng/components/common/api";
import {Component, Output} from "@angular/core";
import {SiteBrowserState} from "../site-browser/shared/site-browser.state";
import {Subscription} from "rxjs";
import EventEmitter = NodeJS.EventEmitter;

@Component({
    selector: 'breadcrumb',
    template: require('./breadcrumb.html'),
    styles: [require('./../app.css')]
})
export class BreadcrumbComponent {

    private pathItems: MenuItem[];
    subscription: Subscription;

    constructor(private updateService: SiteBrowserState) {
        this.subscription = updateService.siteSource$.subscribe(
            siteName => {
                // console.log(siteName);
                this.onSiteChange(siteName);
            });
        this.subscription = updateService.folderSource$.subscribe(
            folderName => {
                // console.log(siteName);
                this.onFolderClick(folderName);
            });
    }

    onSiteChange(siteName: string) {
        this.pathItems = [];
        this.pathItems.push({label: siteName,command: (event: Event) => { this.updateService.changeSite(siteName) }});
    }

    onFolderClick(folderName : string){
        let uri : string = "";
        for(let i=1;i < this.pathItems.length;i++){
            let pi : MenuItem = this.pathItems[i];
            uri = uri + "/" + pi.label;
        }
        uri = uri + "/" + folderName;
        let newPathItems : MenuItem[] = this.pathItems.slice(0);
        newPathItems.push({label: folderName,command: (event: Event) => { this.updateService.changeBreadCrumbFolder(uri);this.pathItems=newPathItems }});
        this.pathItems.push({label: folderName,command: (event: Event) => { this.updateService.changeBreadCrumbFolder(uri);this.pathItems=newPathItems }});
    }

}