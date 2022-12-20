import { DataSource, DataSourceOptions } from 'typeorm'
import { dbConfig } from './config'

export class ApplicationDatabase {
  private readonly _AppDataSource: DataSource
  private readonly _config: DataSourceOptions

  constructor () {
    this._config = dbConfig.production
    this._AppDataSource = new DataSource(this._config)
  }

  public get AppDataSource (): DataSource {
    return this._AppDataSource
  }

  public async start (): Promise<DataSource> {
    const connection = await this._AppDataSource.initialize()
    console.log('DATABASE CONNECTED')
    return connection
  }
}
