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
        apiURL: 'http://api.krw.ximaxgames.com',
        operator: 'glam',
        privateKey: '749BD1571F84B3BCDAF0525FC220B0BD'
    },
    // transactionOptions: {
    //     readPreference: 'primary',
    //     readConcern: { level: 'local' },
    //     writeConcern: { w: 'majority' }
    // },
    jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
    expiresIn: 60 * 60 * 1,
    pageSize: 30
};
exports.default = config;
