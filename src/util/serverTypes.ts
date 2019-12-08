import express = require('express');
import Database from '../Database';

/**
 * Used to type certain server application data is present under the app.locals property such as the DB.
 * Controllers would extend this interface rather than express.Request.
 */
export interface Request extends express.Request {
    app:Application
}

export interface Application extends express.Application {
    locals: ServerLocalProperties
}

interface ServerLocalProperties {
    db:Database
}

export interface Response extends express.Response {

}