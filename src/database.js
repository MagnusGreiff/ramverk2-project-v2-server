"use strict";

const dsn = process.env.DBWEBB_DSN || "mongodb://localhost:27017/server";
const mongo = require("mongodb").MongoClient;

let getAllContentFromDatabase = async (criteria, projection, limit, sort) => {
    const db = await mongo.connect(dsn);
    const col = await db.collection('history');
    const res = await col.find(criteria, projection).limit(limit).sort(sort).toArray();

    await db.close();

    return res;
};

let insertToCollection = async (obj) => {
    const db = await mongo.connect(dsn);
    const col = await db.collection('history');
    let ob = JSON.parse(obj);
    const insert = await col.insert(ob);

    await db.close();

    return 'inserted';
};

module.exports = {
    getAllContentFromDatabase: getAllContentFromDatabase,
    insertToCollection: insertToCollection
};
