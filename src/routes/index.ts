import { Router } from "express";

export class RootRouter {
  private _router: Router

  constructor() {
    this._router = Router()
    this.routes()
  }

  public get router(): Router {
    return this._router
  }

  private routes(): void {
  }
}