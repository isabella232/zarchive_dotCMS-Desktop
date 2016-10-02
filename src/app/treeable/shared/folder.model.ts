import {Treeable} from "./treeable.model";

export interface Folder extends Treeable{
    showOnMenu : boolean;
    sortOrder : number;
    hostId : string;
    filesMasks : string;
    defaultFileType : string;
}
