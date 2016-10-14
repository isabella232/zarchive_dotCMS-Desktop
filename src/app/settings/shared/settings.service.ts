import {Injectable} from "@angular/core";
import {ConfigSettings} from "../settings.component";
import {AppRouterService} from "../../app-router.service";
import {JWTAuthService} from "dotcms-js/core/util/jwt-auth.service";
import {SettingsStorageService} from "dotcms-js/core/util/settings-storage.service";

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