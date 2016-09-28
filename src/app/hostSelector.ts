import {Component} from "@angular/core";
import {HttpClient} from "./httpService";
import {Response} from "@angular/http";

import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

export interface Site {
    hostname: string;
    identifier: string;
    inode: string;
}

@Component({
    selector: 'host-selector',
    template: require('./hostselector.html'),
    styles: [require('./app.css')],
    providers: [HttpClient]
})
export class HostSelector {
    sites: Site[];
    filteredHosts: any[];
    host: string;

    constructor(private _httpClient: HttpClient) {
    }

    filterHosts(event) {
        console.log("event query is set to : " + event.query);
        this._httpClient.get('http://localhost:8080/api/v1/site/filter/' + event.query + '/archived/false')
            .map((res: Response) => this.extractDataFilter(res))
            .subscribe(
                data => this.formatResult(data,event),
                err => this.handleError(err),
                () => console.log('done')
                // () => this.formatResult()
            );
        setTimeout(() => {}, 100)
    }

    private formatResult(hosts : Site[], event :any = 0) {
        this.filteredHosts = [];
        this.sites = hosts;
        console.log("format result");
        for (let i = 0; i < this.sites.length; i++) {
            let site = this.sites[i].hostname;
            if(event && site.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredHosts.push(site);
                // this.filteredHosts[0] = this.sites[0].hostname;
            }else{
                this.filteredHosts[i] = this.sites[i].hostname;
            }
        }
    }

    private extractDataDropdown(res: Response): Site[] {
        let obj = JSON.parse(res.text());
        console.log(obj);
        console.log(obj.entity.sites);
        console.log("Number of Hosts is " + obj.entity.sites.length);
        console.log("Host Name is " + obj.entity.sites[0].hostname);
        return obj.entity.sites;
    }

    private extractDataFilter(res: Response): Site[] {
        let obj = JSON.parse(res.text());
        console.log(obj);
        console.log(obj.entity);
        console.log("Number of Hosts is " + obj.entity.result.length);
        console.log("Host Name is " + obj.entity.result[0].hostname);
        return obj.entity.result;
    }

    private handleError(error: any) {
        // we need use a remote logging infrastructure at some point
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        let myNotification: Notification;
        if (errMsg) {
            console.log(errMsg);
            myNotification = new Notification('Error', {
                body: 'There was an error; please try again : ' + errMsg
            });
            return Observable.throw(errMsg);
        }
    }

    handleDropdownClick() {
        this.filteredHosts = [];
        this._httpClient.get('http://localhost:8080/api/v1/site/currentSite')
            .map((res: Response) => this.extractDataDropdown(res))
            .subscribe(
                data => this.formatResult(data),
                err => this.handleError(err),
                () => console.log('done')
                // () => this.formatResult()
            );
        setTimeout(() => {}, 100)
    }
}
