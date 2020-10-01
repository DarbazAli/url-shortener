'use strict'
console.clear()
const log = console.log

import express from 'express'
import { config } from 'dotenv'

// custom modules
import homeRoute from './routes/homeRoute.js'

// init express app = main
const app = express()
config() // dotenv

const { PORT } = process.env
app.listen(PORT, log(`Server running on PORT ${PORT}\n`))

// setup template engine
app.set('views', './views')
app.set('view engine', 'pug')

// serve static files
app.use(express.static(process.cwd() + '/public'))

homeRoute(app)
