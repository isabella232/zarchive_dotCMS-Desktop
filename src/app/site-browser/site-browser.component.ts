import {Component} from "@angular/core";
import {Message, TreeNode} from "primeng/components/common/api";
import {BrowserTreeService} from "./site-browser.service";
import {FileSystemService} from "../util/filesystem.service"
import {HttpClient} from "../util/http.service";
import {SiteBrowserState} from "./site-browser.state";
import {Subscription} from "rxjs";

let fs = require('fs');

@Component({
    selector: 'browser-tree',
    template: require('./sitebrowser.html'),
    styles: [require('./../app.css')],
    providers: [BrowserTreeService,HttpClient,FileSystemService]
})
export class SiteBrowser  {

    dropzoneStylesVisible : boolean = true;
    siteName : string;
    msgs: Message[];
    lazyFiles: TreeNode[];
    selectedNode : TreeNode;
    subscription: Subscription;

    constructor(private nodeService: BrowserTreeService,
                private updateService: SiteBrowserState,
                private fsService : FileSystemService) {
        this.subscription = updateService.siteSource$.subscribe(
            siteName => {
                this.loadHost(siteName);
            });
        this.subscription = updateService.breadCrumbFolderSource$.subscribe(
            uri => {
                this.loadFolder(uri);
            });
    }

    handleDragOver(e){
        this.dropzoneStylesVisible=true;
    }

    handleDrop(e) {
        e.preventDefault();
        let pathToUploadTo : string;
        var files: File = e.dataTransfer.files;
        let folderTitle :string = e.path[0].innerText;
        console.log(files);

        for(let i=0;i<this.lazyFiles.length;i++){
            let node : TreeNode = this.lazyFiles[i];
            if(node.data.title==folderTitle && node.data.type=="folder"){
                pathToUploadTo=node.data.path;
                break;
            }
        }
        console.log("Path : " + pathToUploadTo);
        console.log("Is Directory : " + fs.statSync(files[0].path).isDirectory());
        // console.log("Is Directory : " + this.fsService.isDirectory(files[0].path));

        return false;
    }

    loadHost(siteName : string){
        this.nodeService.getRoot(siteName)
            .then(items => this.lazyFiles = items)
            .then(items => this.siteName = siteName);
    }

    loadFolder (uri : string){
        this.nodeService.getFolder(this.siteName,uri)
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
        this.updateService.changeFolder(pathName);
        if(event.node) {
            this.nodeService.getFolder(this.siteName,event.node.data.path)
                .then(items => this.lazyFiles = items);
        }
    }
}
