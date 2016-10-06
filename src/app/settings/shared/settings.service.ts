import {LocalStoreService} from "../../util/local-store.service";
import {DotSettings} from "../settings.model";
import {APP_CONFIG, AppConfig} from "../../app.config";
import {Inject, Injectable} from "@angular/core";
import {ConfigSettings} from "../settings.component";
import {JWTAuthService} from "../../util/jwt-auth.service";
import {SiteBrowserState} from "../../util/site-browser.state";
import {inject} from "@angular/core/testing";
import {SettingsStorageService} from "./settings-storage.service";
import {AppRouterService} from "../../app-router.service";

@Injectable()
export class SettingsService {

    configKey : string;

    constructor(
        private authService : JWTAuthService,
        private settingsStorageService : SettingsStorageService,
        private appRouterService : AppRouterService
    ) {}

    saveConfigSettings(configSettings : ConfigSettings){
        this.authService.getJWT(configSettings.siteURL,configSettings.userName,configSettings.password)
            .subscribe(
                token => {
                    this.settingsStorageService.storeSettings(configSettings.siteURL, token)
                    this.appRouterService.openSettings()
                });
    }

}