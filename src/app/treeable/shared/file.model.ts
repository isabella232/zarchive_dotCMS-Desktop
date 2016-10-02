import {Treeable} from "./treeable.model";

export class File extends Treeable {
    languageId : number;
    path : string;
    parent : string;
    mimeType : string;
    fileName : string;
}