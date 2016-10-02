var fs = require('fs');

export class FileSystemService {

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
        let myNotification: Notification;
        if (err) {
            console.log(err);
            myNotification = new Notification('Error', {
                body: 'There was an error reading the file or directory; please try again'
            });
        }
    }


}