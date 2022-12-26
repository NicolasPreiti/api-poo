import dotenv from 'dotenv'
import express, { Router } from 'express'
import { Server } from 'http'
import { DataSource } from 'typeorm'
import { ApplicationDatabase } from './db'
import { RootRouter } from './routes'

dotenv.config()

export class ApplicationServer {
  private readonly _app: express.Application
  private readonly _port: number
  private _router!: Router
  private _AppDataSource!: DataSource

  constructor () {
    this._app = express()
    this._port = Number(process.env.$PORT) | 3000

    new ApplicationDatabase().start()
      .then((dataSource) => {
        this._AppDataSource = dataSource
        this._router = new RootRouter(this._AppDataSource).router

        this.middlewares()
        this.routes()
      })
      .catch(err => {
        console.error(err)
      })
  }

  private middlewares (): void {
    this._app.use(express.json())
    this._app.use(express.urlencoded())
  }

  private routes (): void {
    this._app.get('/', (req, res) => {
      res.send('hi')
    })
    this._app.use('/', this._router)
  }

  public start (): Server {
    return this._app.listen(this._port, () => console.log(`SERVER RUNNING ON PORT ${this._port}`))
  }
}

new ApplicationServer().start()
