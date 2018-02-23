"use strict";

const db = require('../src/database');
const rf = require('../src/routeFunctions');
const token = rf.checkApiToken("../config/token", "../config/example-token.json");

exports.index = (req, res) => {
    res.send({
        "index": "index"
    });
};

exports.posts = (req, res) => {
    let key = token.key;
    let type = token.type;
    let id = req.params.id;

    rf.request(id, 'filter=!9YdnSEPmy',
        'https://api.stackexchange.com/2.2/posts/', key, type, res);
};


exports.users = (req, res) => {
    let key = token.key;
    let type = token.type;
    let id = req.params.id;

    rf.request(id, 'filter=!)Rwe3d0xUOrUT)mXD2__Jipi',
        'https://api.stackexchange.com/2.2/users/', key, type, res);;
};


exports.dbGetAll = (req, res) => {
    rf.getAllContentFromDatabase(res);
};

exports.dbInsert = (req, res) => {
    rf.insertIntoDatabase(req, res);
};
