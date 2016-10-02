export class Treeable{
    inode : string;
    identifier : string;
    type : string;
    modDate : Date;
    name : string;
    live : boolean;
    working : boolean;
    archived : boolean;
    title: string;

    modDateFormated(){
        this.modDate.toISOString().split('T')[0];
    }
}