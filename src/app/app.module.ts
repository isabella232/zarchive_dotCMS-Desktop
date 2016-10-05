import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component';
import {ThumbnailComponent} from './image-edit/thumbnail.componet';
import {routing} from "./app.routing";
import {SettingsComponent} from "./settings/settings.component";
import {HttpModule, JsonpModule} from '@angular/http';
import {TreeTableModule, SharedModule, TreeModule, AutoCompleteModule} from 'primeng/primeng';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FormsModule}   from '@angular/forms';
import {GramComponent} from "./image-edit/gram.component";
import {SiteBrowserComponent} from "./site-browser/site-browser.component";
import {SiteSelectorComponent} from "./site-selector/site-selector.component";
import {BreadcrumbModule} from "primeng/components/breadcrumb/breadcrumb";
import {MenuModule} from "primeng/components/menu/menu";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.componet";
import {DragDropModule} from "primeng/components/dragdrop/dragdrop";
import {SiteTreeTableComponent} from "./site-treetable/site-treetable.component";
import {DOT_CONFIG, APP_CONFIG} from "./app.config";
import {Logger, LOG_LOGGER_PROVIDERS, Options as LoggerOptions, Level as LoggerLevel} from "angular2-logger/core";
import {SiteBrowserState} from "./util/site-browser.state";
import {SiteDatatableComponent} from "./site-datatable/site-datatable.component";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {TreeableDetailComponent} from "./treeable-detail/treeable-detail.component";
import {ButtonModule} from "primeng/components/button/button";
import {LocalStoreService} from "./util/local-store.service";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        TreeTableModule,
        SharedModule,
        TreeModule,
        DataTableModule,
        AutoCompleteModule,
        FormsModule,
        BreadcrumbModule,
        MenuModule,
        DragDropModule,
        InputTextModule,
        ButtonModule
    ],
    declarations: [
        AppComponent,
        ThumbnailComponent,
        SettingsComponent,
        GramComponent,
        SiteBrowserComponent,
        SiteSelectorComponent,
        SiteTreeTableComponent,
        BreadcrumbComponent,
        SiteDatatableComponent,
        TreeableDetailComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: APP_CONFIG, useValue: DOT_CONFIG},
        {provide: SiteBrowserState, useClass: SiteBrowserState},
        {provide: LocalStoreService, useClass: LocalStoreService},
        {provide: LoggerOptions, useValue: { level: LoggerLevel.INFO } },Logger
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}