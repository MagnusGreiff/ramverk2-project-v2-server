const fetch = require('node-fetch');
const db = require('./database');

let checkApiToken = (validPath, unvalidPath) => {
    let token;

    try {
        token = require(validPath);
        console.info("\x1b[32m",
            "You are using token.json and can now do api request if your key is valid.");
        console.info("\x1b[0m");
    } catch (e) {
        console.warn("\x1b[33m",
            "You are using example-token.json. You need to add your own key to token.json.");
        console.warn("The server will start but you can't do any api requests.");
        console.info("\x1b[0m");
        token = require(unvalidPath);
    }
    return token;
};


let makeRequest = (url, res) => {
    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            let jsonInfo = responseJson;

            res.json({
                json: jsonInfo
            });
            res.end();

            return "request completted";
        })
        .catch((error) => {
            console.error(error);
        });
};

let request = (id, filterInput, linkInput, keyInput, typeInput, res) => {
    let postId = id;
    let filter = filterInput;
    let link = linkInput;

    try {
        (() => {
            let key = keyInput;
            let type = typeInput;
            let url;

            if (type === "public") {
                url = link + postId + '?site=stackoverflow&' + filter;
            } else if (type === "private") {
                url = link + postId + '?site=stackoverflow&' + filter + '&key=' + key;
            }

            return makeRequest(url, res);
        })();
    } catch (e) {
        console.error(e);
    }
};


let getAllContentFromDatabase = async (res) => {
    try {
        let data = await db.getAllContentFromDatabase({}, {
            _id: 0
        }, 0, {
            date: 1
        })

        console.log(data);

        res.json(data);
        res.end();

        return "retrieved all data from database"
    } catch (err) {
        console.error(err);
    }
}

let insertIntoDatabase = async (req, res) => {
    let obj = await req.params.ob;

    await db.insertToCollection(obj);

    res.end();
};



module.exports = {
    checkApiToken: checkApiToken,
    makeRequest: makeRequest,
    request: request,
    getAllContentFromDatabase: getAllContentFromDatabase,
    insertIntoDatabase: insertIntoDatabase
};
