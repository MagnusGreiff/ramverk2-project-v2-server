"use strict";

/* eslint-disable no-unused-vars */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

/* global describe */
/* global it */

describe("test all routes", () => {
    describe('/GET index', () => {
        it('it should return object', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
    });

    describe('/GET post', () => {
        it('it should return post information from Stackoverflow', (done) => {
            chai.request(server)
                .get('/posts/47810715')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    let items = res.body.json.items;

                    items[0].title.should.equal("login template accepting every input");
                    items[0].link.should.equal("https://stackoverflow.com/q/47810715");
                    done();
                });
        });
    });

    describe('/GET post', () => {
        it('it should return user information from Stackoverflow', (done) => {
            chai.request(server)
                .get('/users/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    let items = res.body.json.items;

                    items[0].link.should.equal("https://stackoverflow.com/users/1/jeff-atwood");
                    items[0].display_name.should.equal("Jeff Atwood");
                    done();
                });
        });
    });


    describe('/GET get', () => {
        it('it should return messages from database', (done) => {
            chai.request(server)
                .get('/db/getAll')
                .end((err, res) => {
                    console.log(res.text);
                    res.should.have.status(200);
                    res.should.be.an("object");
                    done();
                });
        });
    });

    describe('/GET Error', () => {
        it('should return error', (done) => {
            chai.request(server)
                .get("/munge")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.header["content-type"].should.equal("application/json; charset=utf-8");
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
