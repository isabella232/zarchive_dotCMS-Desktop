import {Component, OnInit} from "@angular/core";
import {AppRouterService} from "../app-router.service";
import {SettingsStorageService} from "dotcms-js/core/util/settings-storage.service";

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
