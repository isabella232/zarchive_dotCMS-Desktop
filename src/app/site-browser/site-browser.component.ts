import {Component} from "@angular/core";
import {SiteTreetableService} from "../site-treetable/site-treetable.service";
import {FileSystemService} from "../util/filesystem.service";
import {SiteBrowserState} from "../util/site-browser.state";
import {SiteBrowserService} from "../util/site-browser.service";
import {HttpClient} from "../util/http.service";
import {NotificationService} from "../util/notification.service";
import {Logger} from "angular2-logger/core";
import {LoggerService} from "../util/logger.service";
import {SiteSelectorService} from "../site-selector/site-selector.service";
import {LocalStoreService} from "../util/local-store.service";

@Component({
    selector: 'browser-tree',
    template: require('./sitebrowser.html'),
    styles: [require('./../app.css')],
    providers: [
        FileSystemService,
        SiteTreetableService,
        SiteBrowserService,
        HttpClient,
        NotificationService,
        LoggerService,
        SiteSelectorService
    ]
})
export class SiteBrowserComponent  {

}
