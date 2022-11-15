import { v4 as uuid } from 'uuid'

export class Uuid {
  public generate (): string {
    const id = uuid()
    return id
  }
}
