import express = require('express');
import Database from '../Database';

/**
 * Used to type certain request and server application data is present under the app.locals property such as the DB.
 * Controllers would extend this interface rather than express.Request.
 */
export interface Request extends express.Request {
    app:Application
}

export interface Application extends express.Application {
    locals: {db: Database}
}

/**
 * Used to type certain response and server application data is present under the app.locals property such as the DB.
 * Controllers would extend this interface rather than express.Request.
 */
export interface Response extends express.Response {
    app:Application
}
