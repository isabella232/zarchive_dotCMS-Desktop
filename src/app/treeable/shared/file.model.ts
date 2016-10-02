import {Treeable} from "./treeable.model";

export interface file extends Treeable {
    languageId : number;
    path : string;
    parent : string;
    mimeType : string;
    fileName : string;
}