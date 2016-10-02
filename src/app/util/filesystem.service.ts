import {MessageService} from "./message.service";
import {Inject} from "@angular/core";
var fs = require('fs');

@Inject("messageService")
export class FileSystemService {

    constructor
    (
        private messageService: MessageService
    )
    {
        this.messageService = messageService
    }

    isDirectory(localPath : string) {
        let ret : boolean = false;
        fs.stat(localPath, function (err,data,r) {
            if (err) {
                this.logFileReadingError(err);
                throw err;
            }
            r = data.isDirectory();
        }).toPromise().onSuccess(function(r) {ret = r});
        return ret;
    }

    private logFileReadingError(err){
        if (err) {
            console.log(err);
            this.messageService.displayErrorMessage("There was an error reading the file or directory; please try again");
        }
    }


}