import { Component} from '@angular/core';
import { remote, ipcRenderer } from 'electron';

var fs = require('fs');

@Component({
    selector: 'settings',
    template: require('./settings.html'),
    styles: [ require('./../app.css') ],
})

export class SettingsComponent {

    backToMain() {
        let mainHTML = 'file://' + fs.realpathSync('.') + '/src/app/app.html';
        console.log('dir name : ' + mainHTML);
        ipcRenderer.send('load-page',mainHTML);
    }

}