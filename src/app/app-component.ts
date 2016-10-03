let filters = require('./../assets/data/filters.json');

import { Component} from '@angular/core';
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
        private router: Router
    )
    {
        //router.navigate(['/gram']);
    }

    openSettings() {
        if(this.settingsOpened){
            this.router.navigate(['']);
            this.settingsOpened=false;
        }else {
            this.router.navigate(['/settings']);
            this.settingsOpened=true;
        }
    }
    openGram() {
        if(this.gramOpened){
            this.router.navigate(['']);
            this.gramOpened=false;
        }else {
            this.router.navigate(['/gram']);
            this.gramOpened=true;
        }
    }

}

