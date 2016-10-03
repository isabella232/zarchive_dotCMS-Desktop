import {AppConfig, APP_CONFIG} from "../app.config";
import {Inject} from "@angular/core";
import {Logger} from "angular2-logger/core";

/**
 * To set the logger level in the console run logger.level=logger.Level.DEBUG
 */
@Inject('_logger')
export class LoggerService {

    constructor
    (
        private _logger: Logger
    )
    {
    }

    info(message : string){
        this._logger.info(message);
    }

    error(message : string){
        this._logger.error(message);
    }

    warn(message : string){
        this._logger.warn(message);
    }

    debug(message : string){
        this._logger.debug(message);
    }
}