import dotenv from "dotenv"
import express, { Router } from "express"
import { Server } from "http"
import { ApplicationDatabase } from "./db"
import { RootRouter } from "./routes"

dotenv.config()

export class ApplicationServer {
  private _app: express.Application
  private _port: number
  private _router: Router

  constructor() {
    this._app = express()
    this._port = Number(process.env.PORT) | 3000
    this._router = new RootRouter().router

    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this._app.use(express.json())
    this._app.use(express.urlencoded())
  }

  private routes(): void {
    this._app.use("/", this._router)
  }

  public start(): Server {
    return this._app.listen(this._port, () => console.log(`SERVER RUNNING ON PORT ${this._port}`))
  }
}

new ApplicationServer().start()
new ApplicationDatabase().start()