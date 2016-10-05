import {Component, Inject} from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import {DotCMSDesktopSettings} from "./settings.model";
import {LocalStoreService} from "../util/local-store.service";

export class ConfigSettings {
    siteURL : string
    userName : string
    password : string
}

@Component({
    selector: 'settings',
    template: require('./settings.html'),
    styles: [ require('./../app.css') ],
})
export class SettingsComponent {

    configSettings : ConfigSettings = new ConfigSettings();
    dotConf : DotCMSDesktopSettings;

    constructor(
        private localStorageService : LocalStoreService
    ) {
        this.dotConf = JSON.parse(this.localStorageService.getValue("siteURL"));
        if (!this.dotConf) {
            this.dotConf = new DotCMSDesktopSettings();
        }else{
            this.configSettings.siteURL=this.dotConf.site;
        }
    }
    onSubmit() {
        // this.localStorageService.storeValue("siteURL",JSON.stringify(this.dotConf));
    }

}