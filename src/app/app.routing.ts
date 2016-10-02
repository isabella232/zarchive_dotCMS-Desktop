import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {Settings} from "./settings/settings.component";
import {Gram} from "./image-edit/gram.component";
import {SiteBrowser} from "./site-browser/site-browser.component";

const appRoutes: Routes = [
    {
        path: 'gram',
        component: Gram
    },
    {
        path: 'settings',
        component: Settings
    },
    {
        path: '',
        component:SiteBrowser
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);