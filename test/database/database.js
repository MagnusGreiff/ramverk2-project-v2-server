"use strict";

/* eslint-disable no-unused-vars */

const assert = require("assert");
const mongodb = require('mongo-mock');

mongodb.max_delay = 0;

const MongoClient = mongodb.MongoClient;

MongoClient.persist = "mongo.js";

const url = 'mongodb://localhost:27017/history';

const db = require('../../src/database');


// Låste inte datorn en dag, nu finns det en kommentar här. // Simon H

/* global describe */
/* global it */



describe("insert object into database and get result", async function() {
    it("it should insert {'name': 'hejsan'} and return same result", async function() {
        let obj = {
            "name": "hejsan"
        };
        let strObj = JSON.stringify(obj);


        console.log(strObj);

        await db.insertToCollection(strObj);

        let result = await db.getAllContentFromDatabase({}, {
            _id: 0
        }, 1, {
            date: -1
        });

        result.should.be.an("array");
    });
});
