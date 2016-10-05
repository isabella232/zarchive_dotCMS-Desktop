import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export interface AppConfig {
    iconPath: string;
    dotCMSURLKey : string;
    dotCMSURLJWTKey : string
}

export const DOT_CONFIG: AppConfig = {
    iconPath: './src/assets/images/icons',
    dotCMSURLKey: 'siteURL',
    dotCMSURLJWTKey: 'siteURLJWT'
};
