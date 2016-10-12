import {Component, OnInit} from "@angular/core";
import {SettingsStorageService} from "../util/settings-storage.service";
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
