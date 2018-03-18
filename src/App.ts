import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Schema } from './graphql/schema'
import * as graphqlHTTP from 'express-graphql'

import { init as initDB } from './db'

export class App {
  expressApp
  port = process.env.PORT || 3000

  constructor() {
    this.expressApp = express()

    this.expressApp.use(bodyParser.json())
		this.expressApp.use(bodyParser.urlencoded({extended: false}))	
		
		this.expressApp.use('*', (req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*')
			res.header('Access-Control-Allow-Credentials', true)
			res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT')
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
			res.header('Access-Control-Max-Age', '600')
			next()
    })
    
    this.expressApp.options('*', (req, res) => { res.send('OK') })

    initDB()
  }

  start() {
    this.loadRoutes()

    this.listen()
  }

  loadRoutes() {
    this.expressApp.use('/', (req, res, next) => {
      //TODO: add authentication middleware here

			next()
		},
			graphqlHTTP(req => ({
				schema: Schema,
				graphiql: true //Set to false if you don't want graphiql enabled,
			}))
		)
  }

  listen() {
    this.expressApp.listen(this.port, (err) => {
			if (err) throw err

			return console.log(`server is listening on ${this.port}`)
		})
  }
}