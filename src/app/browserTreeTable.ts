import {OnInit, Component} from "@angular/core";
import {Message, TreeNode} from "primeng/components/common/api";
import {BrowserTreeService} from "./browserTreeService";
import {Http} from "@angular/http";
import {HttpClient} from "./httpService";
import {BrowserTreeUpdateService} from "./browserTreeUpdateService";
import {Subscription} from "rxjs";


@Component({
    selector: 'browser-tree',
    template: require('./browsertree.html'),
    styles: [require('./app.css')],
    providers: [BrowserTreeService,HttpClient]
})
export class BrowserTreeTable  {

    msgs: Message[];
    lazyFiles: TreeNode[];
    subscription: Subscription;

    constructor(private nodeService: BrowserTreeService,
                private updateService: BrowserTreeUpdateService) {
        this.subscription = updateService.siteSource$.subscribe(
            siteName => {
                // console.log(siteName);
                this.loadHost(siteName);
            });
    }

    loadHost(siteName : string){
        this.nodeService.getRoot(siteName)
            .then(items => this.lazyFiles = items);
    }

    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.data.name});
    }

    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.data.name});
    }

    nodeExpand(event) {
        let pathName : string = (<string>event.node.data.path);
        pathName = pathName.slice(0,pathName.length-1);
        pathName = pathName.slice(pathName.lastIndexOf("/") + 1,pathName.length)
        console.log(pathName);
        // let pathName : string = originalPath.slice(originalPath.indexOf("/") + 1,originalPath.length-1);
        this.updateService.changeFolder(pathName);
        if(event.node) {
            this.nodeService.getFolder('demo.dotcms.com',event.node.data.path)
                .then(items => this.lazyFiles = items);
        }
    }
}
