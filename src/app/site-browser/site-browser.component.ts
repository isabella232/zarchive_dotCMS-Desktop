import {Component, OnInit} from "@angular/core";
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
import {JWTAuthService} from "../util/jwt-auth.service";
import {SettingsService} from "../settings/shared/settings.service";
import {SettingsStorageService} from "../settings/shared/settings-storage.service";
import {AppRouterService} from "../app-router.service";

@Component({
    selector: 'browser-tree',
    template: require('./sitebrowser.html'),
    styles: [require('./../app.css')],
})
export class SiteBrowserComponent implements OnInit{

    constructor(
        private settingsStorageService : SettingsStorageService,
        private appRouterService: AppRouterService
    ){}

    ngOnInit(){
        if(!this.settingsStorageService.getSettings()){
            this.appRouterService.openSettings();
        }
    }

}
