import { DataSource, DataSourceOptions } from "typeorm"
import { dbConfig } from "./config"

export class ApplicationDatabase {
  private _AppDataSource: DataSource
  private _config: DataSourceOptions

  constructor() {
    this._config = dbConfig.develop
    this._AppDataSource = new DataSource(this._config)
  }

  public async start(): Promise<DataSource> {
    return this._AppDataSource.initialize()
      .then((dataSource) => {
        console.log("DATABASE CONNECTED")
        return dataSource
      })
  }
}