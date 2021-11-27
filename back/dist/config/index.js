"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    db: {
        host: '18.183.255.153',
        port: 36183,
        name: 'gold',
        id: 'gold',
        password: 'Qufdl@4860'
    },
    casino: {
        apiURL: '',
        operator: '',
        privateKey: ''
    },
    // transactionOptions: {
    //     readPreference: 'primary',
    //     readConcern: { level: 'local' },
    //     writeConcern: { w: 'majority' }
    // },
    jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
    expiresIn: 60 * 60 * 1,
    pageSize: 30,
    sportPageSize: 30,
    sportsMaxRate: 200,
    powerballTime: 30,
    powerladderTime: 50,
    kenoladderTime: 50,
    boglePowerballTime: 30,
    bogleladderTime: 30,
    googlePowerball1: 15,
    googlePowerball3: 30,
    kplay: {
        code: 'SFT0001',
        token: 'cVsAlijIaYssmkF5qATyhPfoLRffQ9rR',
        // token: '',
        key: 'IVSvfG2FtRdHqmdNciEZGYVzOiCP0GBB',
        // key: '',
        endpoint: 'http://uat.kplayone.com',
        // endpoint: 'http://kplayone.com',
        callbackURL: 'http://127.0.0.1:2008/api' // test
        // callbackURL: 'http://gd-1111.com/api'
    }
};
exports.default = config;
