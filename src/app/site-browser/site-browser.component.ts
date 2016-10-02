import {Component} from "@angular/core";
import {SiteTreetableService} from "../site-treetable/site-treetable.service";
import {FileSystemService} from "../util/filesystem.service";
import {SiteBrowserState} from "./shared/site-browser.state";
import {SiteBrowserService} from "./shared/site-browser.service";
import {HttpClient} from "../util/http.service";
import {MessageService} from "../util/message.service";

@Component({
    selector: 'browser-tree',
    template: require('./sitebrowser.html'),
    styles: [require('./../app.css')],
    providers: [SiteBrowserState,FileSystemService,SiteTreetableService,SiteBrowserService,HttpClient,MessageService]
})
export class SiteBrowser  {

}
