let filters = require('./../assets/data/filters.json');

import {Component} from '@angular/core';
import {AppRouterService} from "./app-router.service";

@Component({
    selector: 'app',
    template: require('./app.html'),
    styles: [ require('./app.css') ],
})
export class AppComponent {

    constructor(
        private appRouterService : AppRouterService
    )
    {}

    openSettings() {
        this.appRouterService.openSettings();
    }
    openGram() {
        this.appRouterService.openGram();
    }

}

