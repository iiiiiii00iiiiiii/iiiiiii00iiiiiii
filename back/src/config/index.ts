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
    },
    canCancelBetTime: number,
    canCancelBetBeforeGameTime: number,
    canCancelBetCount: number
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
//     sportsMaxRate: 100,
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
//     sportsMaxRate: 100,
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
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 5
// }

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
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 30,
//     kenoladderTime: 30,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: 'SFT0005',
//         token: 'A42UoW2OXZl6H7kylAe42sF03Td6t3xE',
//         key: 'Nvxh3fYlRRdyw3X50I2Db5UsohBDC6Xx',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmt.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 10
// }

// // DEMARK
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'demark',
//         id: 'demark',
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
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 30,
//     kenoladderTime: 30,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: 'SFT0003',
//         token: 'BkqULUffEMm1Zlk3zvCQC1DQ1f25fulo',
//         key: 'SZKZdEvi6kOCSM3p3HRTYJ86lcNRuI3t',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmk.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 2
// }

// // MCLAREN
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'mclaren',
//         id: 'mclaren',
//         password: 'Qufdl@4860'
//     },
//     casino: {
//         apiURL: '',
//         operator: '',
//         privateKey: ''
//     },
//     jwtSecret: 'To!@#$%^&*()0987654321Esta365!To',
//     expiresIn: 60 * 60 * 3,
//     pageSize: 30,
//     sportPageSize: 30,
//     sportsMaxRate: 100,
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
//         // http://api.kplay.jmt.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 10
// }

// // BACKNUM
// const config: TConfig = {
//     db: {
//         host: '18.183.255.153',
//         port: 36183,
//         name: 'backnum',
//         id: 'backnum',
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
//     sportsMaxRate: 100,
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
//         // http://api.kplay.jmt.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 5
// }

// // NAPOLI
// const config: TConfig = {
//     db: {
//         host: '18.181.237.109',
//         port: 36186,
//         name: 'napoli',
//         id: 'napoli',
//         password: 'Napoli@4860'
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
//     sportsMaxRate: 100,
//     powerballTime: 30,
//     powerladderTime: 30,
//     kenoladderTime: 30,
//     boglePowerballTime: 30,
//     bogleladderTime: 30,
//     googlePowerball1: 15,
//     googlePowerball3: 30,
//     kplay: {
//         code: 'SFT0006',
//         token: 'IoySI0OF2khy92YQeL2u3gIciy2khz5t',
//         key: 'Z7STpvXQWxAxriKQ0UHDwHvQcf32a5zd',
//         endpoint: 'http://kplayone.com'
//         // http://api.kplay.jmk.soft24.io/api
//     },
//     canCancelBetTime: 10,
//     canCancelBetBeforeGameTime: 10,
//     canCancelBetCount: 2
// }

// PENT
const config: TConfig = {
    db: {
        host: '18.181.237.109',
        port: 36186,
        name: 'pent',
        id: 'pent',
        password: 'Pent@4860'
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
    sportsMaxRate: 100,
    powerballTime: 30,
    powerladderTime: 30,
    kenoladderTime: 30,
    boglePowerballTime: 30,
    bogleladderTime: 30,
    googlePowerball1: 15,
    googlePowerball3: 30,
    kplay: {
        code: '',
        token: '',
        key: '',
        endpoint: 'http://kplayone.com'
        // http://api.kplay.jmk.soft24.io/api
    },
    canCancelBetTime: 10,
    canCancelBetBeforeGameTime: 10,
    canCancelBetCount: 10
}



export default config