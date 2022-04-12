import { MongoClient, ObjectId } from 'mongodb'
import { logger } from './modules'

import config from '../config'

const mongoClient = MongoClient
const ObjectID = ObjectId

// Database Name
const dbHost: string = process.env.NODE_ENV == 'production' ? '127.0.0.1' : config.db.host // You can use 'localhost\\instance' to connect to named instance
const dbPort: number = config.db.port
const dbName: string = config.db.name
const dbUser: string = encodeURIComponent(config.db.id)
const dbPassword: string = encodeURIComponent(config.db.password)

const url: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/?authMechanism=SCRAM-SHA-1&authSource=${dbName}`

// Create a new mongoClient
const client: MongoClient = new mongoClient(url)

let pool: any = null
const mongoDB = {
    connect: (): Promise<any> => new Promise((resolve, reject) => {
        if(pool) {
            resolve(pool)
            return
        }

        client.connect(function(err) {
            if(err) {
                logger.info('Database Connection Failed! Bad Config: ', err)
                pool = null
                resolve(pool)
                return
            }

            logger.info("Connected successfully to MongoDB Server")
            logger.info(dbHost)
            logger.info(dbName)

            pool = client.db(dbName)
            resolve(pool)
        })
    })
}

export { mongoDB, ObjectID, ObjectId }