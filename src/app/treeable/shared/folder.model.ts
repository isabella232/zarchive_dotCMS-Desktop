import {Treeable} from "./treeable.model";

export class Folder extends Treeable{
    showOnMenu : boolean;
    sortOrder : number;
    hostId : string;
    filesMasks : string;
    defaultFileType : string;
}
