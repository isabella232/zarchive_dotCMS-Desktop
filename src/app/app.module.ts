import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App}   from './appComponent';
import {Thumbnail} from './thumbnailComponet';
import {routing} from "./app.routing";
import {Settings} from "./settingsComponent";
import {HttpModule, JsonpModule} from '@angular/http';
import {TreeTableModule, SharedModule, TreeModule, AutoCompleteModule} from 'primeng/primeng';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {Gram} from "./gramComponent";
import {BrowserTreeTable} from "./browserTreeTable";
import {HostSelector} from "./hostSelectorComponent";
import {BrowserTreeUpdateService} from "./browserTreeUpdateService";
import {BreadcrumbModule} from "primeng/components/breadcrumb/breadcrumb";
import {MenuModule} from "primeng/components/menu/menu";
import {BreadcrumbComponent} from "./breadcrumbComponet";
import {DragDropModule} from "primeng/components/dragdrop/dragdrop";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        TreeTableModule,
        SharedModule,
        TreeModule,
        AutoCompleteModule,
        FormsModule,
        BreadcrumbModule,
        MenuModule,
        DragDropModule
    ],
    declarations: [
        App,
        Thumbnail,
        Settings,
        Gram,
        BrowserTreeTable,
        HostSelector,
        BreadcrumbComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: BrowserTreeUpdateService, useClass : BrowserTreeUpdateService}
    ],
    bootstrap: [App]
})
export class AppModule {
}