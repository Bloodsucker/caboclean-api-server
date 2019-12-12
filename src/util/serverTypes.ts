import express = require('express');
import Database from '../Database';
import { ParamsDictionary, Params } from 'express-serve-static-core';

/**
 * Used to type certain request and server application data is present under the app.locals property such as the DB.
 * Controllers would extend this interface rather than express.Request.
 */
export interface Request<P extends Params = ParamsDictionary, ReqBody = object | undefined> extends express.Request<P> {
    app: Application;
    body: ReqBody;
}

export interface Application extends express.Application {
    locals: {db: Database};
}

/**
 * Used to type certain response and server application data is present under the app.locals property such as the DB.
 * Controllers would extend this interface rather than express.Request.
 */
export interface Response extends express.Response {
    app: Application;
}
