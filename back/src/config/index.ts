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
    sportsMaxRate: number
}

const config: TConfig = {
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
    sportsMaxRate: 200
}

export default config