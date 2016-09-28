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
import {HostSelector} from "./hostSelector";
import {HttpClient} from "./httpService";

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
        FormsModule
    ],
    declarations: [
        App,
        Thumbnail,
        Settings,
        Gram,
        BrowserTreeTable,
        HostSelector
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [App]
})
export class AppModule {
}