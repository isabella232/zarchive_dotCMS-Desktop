import {Component} from '@angular/core';
import {SettingsService} from "./shared/settings.service";
import {DotSettings} from "dotJS/core/util/settings.model";
import {SettingsStorageService} from "dotJS/core/util/settings-storage.service";

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