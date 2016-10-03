import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SettingsComponent} from "./settings/settings.component";
import {GramComponent} from "./image-edit/gram.component";
import {SiteBrowserComponent} from "./site-browser/site-browser.component";

const appRoutes: Routes = [
    {
        path: 'gram',
        component: GramComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: '',
        component:SiteBrowserComponent
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);