type TConfig = {
    db: {
        host: string,
        port: number,
        name: string,
        id: string,
        password: string
    },
    casino: {
        apiURL: string,
        operator: string,
        privateKey: string
    },
    // transactionOptions: {
    //     readPreference: string,
    //     readConcern: {
    //         level: string
    //     },
    //     writeConcern: {
    //         w: string
    //     }
    // },
    jwtSecret: string,
    expiresIn: number,
    pageSize: number,
    sportPageSize: number,
    sportsMaxRate: number,

    powerballTime: number,
    powerladderTime: number,
    kenoladderTime: number,
    boglePowerballTime: number,
    bogleladderTime: number,
    googlePowerball1: number,
    googlePowerball3: number,
    kplay: {
        code: string,
        token: string,
        key: string,
        endpoint: string
    }
}

// // GOLD
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'gold',
//         id: 'gold',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     // transactionOptions: {
//     //     readPreference: 'primary',
//     //     readConcern: { level: 'local' },
//     //     writeConcern: { w: 'majority' }
//     // },
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
//         code: '',
//         token: '',
//         key: '',
//         endpoint: 'http://kplayone.com'
//     }
// }

// META
const config: TConfig = {
    db: {
        host: '18.183.255.153',
        port: 36183,
        name: 'meta',
        id: 'meta',
        password: 'Qufdl@4860'
    },
    casino: {
        apiURL: '',
        operator: '',
        privateKey: ''
    },
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
        code: 'SFT0002',
        token: 'imWlwA8BvfhZpCmas6x42Ow0itUGIV7j',
        key: 'Jgl6qopQoaDUD0HUq9YyiIdLif7tDR0i',
        endpoint: 'http://kplayone.com'
        // http://api.kplay.jmt.soft24.io/api
    }
}

// // THREE
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'three',
//         id: 'three',
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
//     powerladderTime: 30,
//     kenoladderTime: 30,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: '',
//         token: '',
//         key: '',
//         endpoint: ''
//         // http://api.kplay.jmt.soft24.io/api
//     }
// }

export default config