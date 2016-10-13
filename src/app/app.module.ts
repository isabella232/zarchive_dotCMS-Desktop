import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component';
import {ThumbnailComponent} from './image-edit/thumbnail.componet';
import {routing} from "./app.routing";
import {SettingsComponent} from "./settings/settings.component";
import {HttpModule, JsonpModule} from '@angular/http';
import {TreeTableModule, SharedModule, TreeModule, AutoCompleteModule} from 'primeng/primeng';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {GramComponent} from "./image-edit/gram.component";
import {SiteBrowserComponent} from "./site-browser/site-browser.component";
import {BreadcrumbModule} from "primeng/components/breadcrumb/breadcrumb";
import {MenuModule} from "primeng/components/menu/menu";
import {DragDropModule} from "primeng/components/dragdrop/dragdrop";
import {Logger, LOG_LOGGER_PROVIDERS, Options as LoggerOptions, Level as LoggerLevel} from "angular2-logger/core";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {ButtonModule} from "primeng/components/button/button";
import {SettingsService} from "./settings/shared/settings.service";
import {CanvasService} from "./image-edit/canvas.service";
import {AppRouterService} from "./app-router.service";
import {PasswordModule} from "primeng/components/password/password";
import {FormsModule} from "@angular/forms";
import {SiteSelectorComponent} from "dotJS/components/site-selector/site-selector.component";
import {SiteTreeTableComponent} from "dotJS/components/site-treetable/site-treetable.component";
import {BreadcrumbComponent} from "dotJS/components/breadcrumb/breadcrumb.componet";
import {SiteDatatableComponent} from "dotJS/components/site-datatable/site-datatable.component";
import {TreeableDetailComponent} from "dotJS/components/treeable-detail/treeable-detail.component";
import {HttpClient} from "dotJS/core/util/http.service";
import {NotificationService} from "dotJS/core/util/notification.service";
import {FileSystemService} from "dotJS/core/util/filesystem.service";
import {SiteTreetableService} from "dotJS/components/site-treetable/site-treetable.service";
import {SiteBrowserService} from "dotJS/core/util/site-browser.service";
import {SiteSelectorService} from "dotJS/components/site-selector/site-selector.service";
import {LoggerService} from "dotJS/core/util/logger.service";
import {JWTAuthService} from "dotJS/core/util/jwt-auth.service";
import {SettingsStorageService} from "dotJS/core/util/settings-storage.service";
import {LocalStoreService} from "dotJS/core/util/local-store.service";
import {SiteBrowserState} from "dotJS/core/util/site-browser.state";
import {APP_CONFIG, DOT_CONFIG} from "dotJS/core/app.config";



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
        ButtonModule,
        PasswordModule
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
        {provide: HttpClient, useClass: HttpClient},
        {provide: APP_CONFIG, useValue: DOT_CONFIG},
        {provide: AppRouterService, useClass: AppRouterService},
        {provide: SettingsService, useClass: SettingsService},
        {provide: CanvasService, useClass: CanvasService},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: NotificationService, useClass: NotificationService},
        {provide: FileSystemService, useClass: FileSystemService},
        {provide: SiteTreetableService, useClass: SiteTreetableService},
        {provide: SiteBrowserService, useClass: SiteBrowserService},
        {provide: SiteSelectorService, useClass: SiteSelectorService},
        {provide: LoggerOptions, useValue: { level: LoggerLevel.INFO } },Logger,
        {provide: LoggerService, useClass: LoggerService},
        {provide: JWTAuthService, useClass: JWTAuthService},
        {provide: SiteBrowserState, useClass: SiteBrowserState},
        {provide: SettingsStorageService, useClass: SettingsStorageService},
        {provide: LocalStoreService, useClass: LocalStoreService}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}