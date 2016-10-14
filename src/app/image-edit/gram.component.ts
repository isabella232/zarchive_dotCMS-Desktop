import {HttpClient} from "dotcms-js/core/util/http.service";
let filters = require('./../../assets/data/filters.json');

import {ViewChild, Component, ChangeDetectorRef, ElementRef, Injectable} from '@angular/core';
import {CanvasService} from './canvas.service';
import {remote, ipcRenderer} from 'electron';
import {writeFile} from 'fs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {SettingsService} from "../settings/shared/settings.service";
import {NotificationService} from "dotcms-js/core/util/notification.service";

var fs = require('fs');

const ipc = require('electron').ipcRenderer;
const app = require('electron');

let {dialog} = remote;


@Component({
    selector: 'gram',
    template: require('./gram.html'),
    styles: [require('./../app.css')],
})
export class GramComponent {
    @ViewChild('canvas') canvas: ElementRef;

    r: Object[];
    errorMessage: string;
    imageElement: HTMLImageElement;
    filters: Array<Object> = filters;
    dropzoneStylesVisible: boolean = true;
    currentFilter: string = '';
    showDropzone: boolean = true;
    openDialogActive: boolean = false;
    saveDialogActive: boolean = false;

    constructor(private _cd: ChangeDetectorRef,
                private _cs: CanvasService,
                private _httpClient: HttpClient,
                private settingsService: SettingsService,
                private messageService: NotificationService) {
        ipcRenderer.on('open-file', this.open.bind(this));
        ipcRenderer.on('save-file', this.save.bind(this));
        this._httpClient.progress$.subscribe(
            data => {
                console.log('progress = ' + data);
            });
    }

    showDropzoneStyles() {
        this.dropzoneStylesVisible = true;
        return false;
    }

    hideDropzoneStyles() {
        this.dropzoneStylesVisible = false;
        return false;
    }

    handleDrop(e) {
        e.preventDefault();
        var files: File = e.dataTransfer.files;

        Object.keys(files).forEach((key) => {
            if (files[key].type === 'image/png' || files[key].type === 'image/jpeg') {
                this.loadImage(files[key].path);
            }
            else {
                alert('File must be a PNG or JPEG!');
            }
        });


        return false;
    }

    loadImage(fileName) {
        let image: HTMLImageElement = new Image();
        image.onload = this.imageLoaded.bind(this, this.canvas.nativeElement, image);
        image.src = fileName;
    }

    open() {
        if (!this.openDialogActive && !this.saveDialogActive) {
            this.openDialogActive = true;
            dialog.showOpenDialog((fileNames) => {
                this.openDialogActive = false;
                if (fileNames === undefined) return;
                let fileName = fileNames[0];
                this.loadImage(fileName)
            });
        }
    }

    save() {
        if (!this.saveDialogActive && !this.openDialogActive) {
            this.saveDialogActive = true;
            dialog.showSaveDialog({
                filters: [
                    {name: 'png', extensions: ['png']}
                ]
            }, this.saveFile.bind(this));
        }
    }

    saveFile(fileName) {
        this.saveDialogActive = false;
        if (fileName === undefined) return;

        let buffer = this._cs.canvasBuffer(this.canvas.nativeElement, 'image/png');

        console.log(fileName);
        writeFile(fileName, buffer, this.saveFileCallback.bind(this, fileName));
    }

    uploadTodotCMS() {
        let data: {
            stName: string;
            hostFolder: string;
            title: string;
            fileName: string;
            type: string;
        } = {
            stName: "fileAsset",
            hostFolder: "demo.dotcms.com:/images",
            // title: this._cs.image.src,
            // fileName: this._cs.image.src,
            title: 'img123',
            fileName: 'img123.jpg',
            type: "application/jpg"
        };

        let buff: Uint8Array = this._cs.canvasBuffer(this.canvas.nativeElement, 'image/jpg');
        let blob = new Blob([buff], {type: 'application/jpg'});

        var b: any = blob;
        b.lastModifiedDate = new Date();
        b.name = this._cs.image.src;

        let files: File[] = [<File>b];

        // this._cs.getData().data.buffer
        //
        // var binary = atob(dataURI.split(',')[1]);
        // var array = [];
        // for(var i = 0; i < binary.length; i++) {
        //     array.push(binary.charCodeAt(i));
        // }
        // return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});

        //let fileName : String = app.getAppPath() + "/" + this._cs.image.src;
        // console.log(fileName);
        // writeFile(fileName, this._cs.canvasBuffer(this.canvas.nativeElement, 'image/png'), this.saveFileCallback.bind(this, fileName));

        console.log('about to send to server')
        // this._httpClient.put('http://localhost:8080/api/content/publish/1', data)
        //     .then(
        //         o => this.r.push(o),
        //         error => this.errorMessage = <any>error);

        // file :File = readFile();

        this._httpClient.filePut('/api/content/publish/1', files[0], data).subscribe();
    }


    saveFileCallback(fileName, err) {
        if (err) {
            console.log(err);
            this.messageService.displayErrorMessage("There was an error; please try again");
        } else {
            this.messageService.displayInfoMessage("Image Saved : " + fileName);
        }
    }

    setFilter(value) {
        let filterName = value.toLowerCase();

        if (this._cs[filterName])
            this._cs[filterName]();
        else
            this._cs.resetCanvas();
    }

    imageLoaded(canvas, image) {
        this.imageElement = image;
        this._cs.initCanvas(canvas, image);

        this.showDropzone = false;
        this.dropzoneStylesVisible = false;

        this._cd.detectChanges();
    }
}

