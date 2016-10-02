import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App}   from './app-component';
import {Thumbnail} from './image-edit/thumbnail.componet';
import {routing} from "./app.routing";
import {Settings} from "./settings/settings.component";
import {HttpModule, JsonpModule} from '@angular/http';
import {TreeTableModule, SharedModule, TreeModule, AutoCompleteModule} from 'primeng/primeng';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {Gram} from "./image-edit/gram.component";
import {SiteBrowser} from "./site-browser/site-browser.component";
import {SiteSelector} from "./site-selector/site-selector.component";
import {SiteBrowserState} from "./site-browser/site-browser.state";
import {BreadcrumbModule} from "primeng/components/breadcrumb/breadcrumb";
import {MenuModule} from "primeng/components/menu/menu";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.componet";
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
        SiteBrowser,
        SiteSelector,
        BreadcrumbComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: SiteBrowserState, useClass : SiteBrowserState}
    ],
    bootstrap: [App]
})
export class AppModule {
}