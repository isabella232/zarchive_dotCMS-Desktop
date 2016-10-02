import {Component} from "@angular/core";
import {Message, TreeNode} from "primeng/components/common/api";
import {FileSystemService} from "../util/filesystem.service"
import {SiteBrowserState} from "../site-browser/shared/site-browser.state";
import {Subscription} from "rxjs";
import {SiteTreetableService} from "./site-treetable.service";
import {MessageService} from "../util/message.service";

let fs = require('fs');

@Component({
    selector: 'site-treetable',
    template: require('./site-treetable.html'),
    styles: [require('./../app.css')]
})
export class SiteTreeTable  {

    dropzoneStylesVisible : boolean = true;
    siteName : string;
    msgs: Message[];
    lazyFiles: TreeNode[];
    selectedNode : TreeNode;
    subscription: Subscription;

    constructor(private updateService: SiteBrowserState,
                private fsService : FileSystemService,
                private siteTreetableService : SiteTreetableService,
                private messageService : MessageService) {
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
        this.messageService.displayInfoMessage("Path is " + pathToUploadTo);

        // console.log("Is Directory : " + this.fsService.isDirectory(files[0].path));

        return false;
    }

    loadHost(siteName : string){
        this.siteName = siteName;
        this.siteTreetableService.getAssetsUnderSite(siteName)
            .subscribe(items => this.lazyFiles = items);
        setTimeout(() => {}, 100)
    }

    loadFolder (uri : string){
        this.siteTreetableService.getAssetsUnderFolder(this.siteName,uri)
            .subscribe(items => this.lazyFiles = items);
        setTimeout(() => {}, 100)
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
        console.log("loading folder");
        let pathName : string = (<string>event.node.data.path);
        pathName = pathName.slice(0,pathName.length-1);
        pathName = pathName.slice(pathName.lastIndexOf("/") + 1,pathName.length)
        this.updateService.changeFolder(pathName);
        if(event.node) {
            this.siteTreetableService.getAssetsUnderFolder(this.siteName,event.node.data.path)
                .subscribe(items => this.lazyFiles = items);
        }
        setTimeout(() => {}, 100)
    }
}
