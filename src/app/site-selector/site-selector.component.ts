import {Component} from "@angular/core";
import {HttpClient} from "../util/http.service";
import {Response} from "@angular/http";

import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {SiteBrowserState} from "../site-browser/shared/site-browser.state";
import {Site} from "../treeable/shared/site.model";
import {MessageService} from "../util/message.service";

@Component({
    selector: 'site-selector',
    template: require('./site.selector.html'),
    styles: [require('./../app.css')],
    providers: [HttpClient]
})
export class SiteSelector {
    sites: Site[];
    filteredHosts: any[];
    host: string = '';

    constructor(private _httpClient: HttpClient,
                private updateService: SiteBrowserState,
                private messageService: MessageService) {
    }

    siteSelected(event){
        this.updateService.changeSite(this.host);
    }

    filterHosts(event) {
        this._httpClient.get('http://localhost:8080/api/v1/site/filter/' + event.query + '/archived/false')
            .map((res: Response) => this.extractDataFilter(res))
            .subscribe(
                data => this.formatResult(data,event),
                err => this.handleError(err)
            );
        setTimeout(() => {}, 100)
    }

    private formatResult(hosts : Site[], event :any = 0) {
        this.filteredHosts = [];
        this.sites = hosts;
        for (let i = 0; i < this.sites.length; i++) {
            let site = this.sites[i].hostname;
            if(event && site.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredHosts.push(site);
            }else{
                this.filteredHosts[i] = this.sites[i].hostname;
            }
        }
    }

    private extractDataDropdown(res: Response): Site[] {
        let obj = JSON.parse(res.text());
        return obj.entity.sites;
    }

    private extractDataFilter(res: Response): Site[] {
        let obj = JSON.parse(res.text());
        return obj.entity.result;
    }

    private handleError(error: any) {
        // we need use a remote logging infrastructure at some point
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        if (errMsg) {
            console.log(errMsg);
            this.messageService.displayErrorMessage("There was an error; please try again : " + errMsg);
            return Observable.throw(errMsg);
        }
    }

    handleDropdownClick() {
        this.filteredHosts = [];
        this._httpClient.get('http://localhost:8080/api/v1/site/currentSite')
            .map((res: Response) => this.extractDataDropdown(res))
            .subscribe(
                data => this.formatResult(data),
                err => this.handleError(err)
            );
        setTimeout(() => {}, 100)
    }
}
