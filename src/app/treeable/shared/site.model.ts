import {Treeable} from "./treeable.model";

export interface Site extends Treeable{
    hostname: string;
    aliases : string;
    identifier: string;
    inode: string;
}