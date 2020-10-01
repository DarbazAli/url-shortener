'use strict'
console.clear()
const log = console.log

import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// import { generate } from 'shortid'

// custom modules
import homeRoute from './routes/homeRoute.js'
import apiRoute from './routes/apiRoute.js'
import URL from './Schema.js'
// init express app = main
const app = express()
config() // dotenv

const { PORT, MONGO_URI } = process.env
app.listen(PORT, log(`Server running on PORT ${PORT}\n`))

// setup template engine
app.set('views', './views')
app.set('view engine', 'pug')

// serve static files
app.use(express.static(process.cwd() + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to Database
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    .then(
        // make requests to db
        log('connected to database'),
        apiRoute(app, URL)
    )
    .catch((err) => log(err))

homeRoute(app)
