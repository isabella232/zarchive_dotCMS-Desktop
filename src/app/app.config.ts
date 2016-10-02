import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export interface AppConfig {
    iconPath: string;
}

export const DOT_CONFIG: AppConfig = {
    iconPath: './src/assets/images/icons'
};
