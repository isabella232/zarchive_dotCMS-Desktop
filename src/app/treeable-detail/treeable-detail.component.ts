import {Component} from "@angular/core";
import {Treeable} from "../treeable/shared/treeable.model";
import {LoggerService} from "../util/logger.service";
import {SiteBrowserState} from "../util/site-browser.state";
import {Subscription} from "rxjs";
@Component({
    selector: 'treeable-detail',
    template: require('./treeable-detail.html'),
    styles: [require('./../app.css')]
})
export class TreeableDetailComponent {

    treeable : Treeable = new Treeable();
    subscription: Subscription;

    constructor(private updateService: SiteBrowserState) {

        if(updateService.getSelectedTreeable()){this.treeable = updateService.getSelectedTreeable()};
        this.subscription = updateService.currentTreeable
            .subscribe(treeable => {
                if (treeable) {
                    this.treeable= treeable;
                }else{
                    this.treeable = new Treeable();
                }
            });
        setTimeout(() => {
        }, 100)
    }

}