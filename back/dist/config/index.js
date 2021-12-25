"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// GOLD
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
        code: '',
        token: '',
        key: '',
        endpoint: 'http://kplayone.com'
    }
};
// // META
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'meta',
//         id: 'meta',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 1,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 200,
//     powerballTime: 30,
//     powerladderTime: 50,
//     kenoladderTime: 50,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: 'SFT0002',
//         token: 'imWlwA8BvfhZpCmas6x42Ow0itUGIV7j',
//         key: 'Jgl6qopQoaDUD0HUq9YyiIdLif7tDR0i',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmt.soft24.io/api
//     }
// }
exports.default = config;
