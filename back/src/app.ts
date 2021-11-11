const ecosystem: any = require('../ecosystem.config.js')

import express from 'express'
import http from 'http'
import history from 'connect-history-api-fallback'
import helmet from 'helmet'
import noCache from 'nocache'
import { mongoDB } from './lib/db'

const app = express()
app.use(helmet({
    contentSecurityPolicy: false,
}))
// app.use(helmet())

// app.use(noCache())
app.use(history())
app.use(express.json({limit: '2mb'}))
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/www'))

//라우트 설정
import apiRouter from './routers'
app.use('/api', apiRouter)

const server: http.Server = http.createServer(app)
const port = process.env.PORT || ecosystem.port

{
    (async () => {
        await mongoDB.connect()

        server.listen(port, () => {
            console.log(process.env.NODE_ENV ? 'production' : 'development')
            console.log(`Listening on port ${port}`)
        })
    })()
}