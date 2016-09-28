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
        this.nodeService.getLazyFilesystem().then(files => this.lazyFiles = files);
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
        if(event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFilesystem().then(nodes => event.node.children = nodes);
        }
    }
}
