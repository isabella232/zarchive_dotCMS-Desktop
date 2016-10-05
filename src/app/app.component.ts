import {AppConfig, APP_CONFIG} from "./app.config";
let filters = require('./../assets/data/filters.json');

import {Component, NgZone, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app',
    template: require('./app.html'),
    styles: [ require('./app.css') ]
})
export class AppComponent {

    settingsOpened: boolean = false;
    gramOpened: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ngZone : NgZone,
        @Inject(APP_CONFIG) config: AppConfig
    )
    {

    }

    openSettings() {
        if(this.settingsOpened){
            this.ngZone.run(() => {
                this.router.navigate(['']);
                this.settingsOpened = false;
            });
        }else {
            this.ngZone.run(() => {
                this.router.navigate(['/settings']);
                this.settingsOpened = true;
            });
        }
    }
    openGram() {
        if(this.gramOpened){
            this.ngZone.run(() => {
                this.router.navigate(['']);
                this.gramOpened = false;
            });
        }else {
            this.ngZone.run(() => {
                this.router.navigate(['/gram']);
                this.gramOpened = true;
            });
        }
    }

}

