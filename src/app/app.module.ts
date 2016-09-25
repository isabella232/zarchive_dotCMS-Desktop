import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {App, Thumbnail}   from './appComponent';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ App, Thumbnail ],
    bootstrap:    [ App ]
})
export class AppModule { }