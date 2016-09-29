import {OnInit, Component} from "@angular/core";
import {Message, TreeNode} from "primeng/components/common/api";
import {BrowserTreeService} from "./browserTreeService";
import {Http} from "@angular/http";
import {HttpClient} from "./httpService";


@Component({
    selector: 'browser-tree',
    template: require('./browsertree.html'),
    styles: [require('./app.css')],
    providers: [BrowserTreeService,HttpClient]
})
export class BrowserTreeTable implements OnInit {

    msgs: Message[];

    lazyFiles: TreeNode[];

    constructor(private nodeService: BrowserTreeService) { }

    ngOnInit() {
        // this.nodeService.getLazyFilesystem().then(files => this.lazyFiles = files);
        this.nodeService.getRoot('demo.dotcms.com')
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
        console.log(event.node.data.path);
        if(event.node) {
            this.nodeService.getFolder('demo.dotcms.com',event.node.data.path)
                .then(items => this.lazyFiles = items);
        }
    }
}
