import {SettingsService} from "../settings/shared/settings.service";
let filters = require('./../../assets/data/filters.json');

import { ViewChild, Input, Component, ElementRef } from '@angular/core';
import { CanvasService } from './canvas.service';
import { remote } from 'electron';


@Component({
    selector: '[thumbnail]',
    template: `<canvas #childCanvas></canvas>`,
    providers: [ CanvasService,SettingsService ],
    styles: [`
    img, canvas {
      width: 150px;
    }
  `]
})
export class ThumbnailComponent {
    @Input() filter: string = '';
    @Input() image: HTMLImageElement;
    @ViewChild('childCanvas') childCanvas: ElementRef;

    constructor(private _cs: CanvasService) {};

    ngAfterViewInit() {
        if (this.image && this.childCanvas) {
            this.initCanvas();
        }
    }

    ngOnChanges() {
        if (this.image && this.childCanvas) {
            this.initCanvas();
        }
    }

    initCanvas() {
        this._cs.initCanvas(this.childCanvas.nativeElement, this.image);

        let filterName = this.filter.toLowerCase();

        if (this._cs[filterName])
            this._cs[filterName]();
        else
            this._cs.resetCanvas();
    }
}