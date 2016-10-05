import {NotificationService} from "./notification.service";
import {Inject} from "@angular/core";

var fs = require('fs');

@Inject("messageService")
export class FileSystemService {

    constructor
    (
        private messageService: NotificationService
    )
    {
        this.messageService = messageService
    }

    recurseDirectory(directory : string, files : String[]) : String[]{
        let filePaths : string = fs.readdirSync(directory);
        if(files==null){files=[]}
        for (var i = 0; i < filePaths.length; i++) {
            let file = filePaths[i];
            if (fs.statSync(directory + '/' + file).isDirectory()) {
                files = this.recurseDirectory(directory + '/' + file, files);
            }
            else {
                files.push(file);
            }
        };
        return files;
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