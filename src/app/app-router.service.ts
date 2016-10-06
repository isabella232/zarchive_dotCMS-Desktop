import {Injectable, NgZone} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class AppRouterService{

    settingsOpened: boolean = false;
    gramOpened: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ngZone : NgZone
    )
    {}

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