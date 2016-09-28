import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {Settings} from "./settingsComponent";
import {Gram} from "./gramComponent";
import {BrowserTreeTable} from "./browserTreeTable";

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
        component:BrowserTreeTable
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);