import {Component, Inject} from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import {DotSettings} from "./settings.model";
import {LocalStoreService} from "../util/local-store.service";
import {SettingsService} from "./shared/settings.service";
import {JWTAuthService} from "../util/jwt-auth.service";
import {SiteBrowserState} from "../util/site-browser.state";
import {HttpClient} from "../util/http.service";
import {SettingsStorageService} from "./shared/settings-storage.service";

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
    dotConf : DotSettings;

    constructor(
        private settingsStorageService : SettingsStorageService,
        private settingsService : SettingsService
    ) {
        this.dotConf = this.settingsStorageService.getSettings();
        if (!this.dotConf) {
            this.dotConf = new DotSettings();
        }else{
            this.configSettings.siteURL=this.dotConf.site;
        }
    }
    onSubmit() {

        this.settingsService.saveConfigSettings(this.configSettings);
    }

    removeCurrentToken(){
        this.settingsStorageService.clearSettings();
    }

}