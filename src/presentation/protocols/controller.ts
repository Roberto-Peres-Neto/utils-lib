import { Response } from 'express'
import { HttpResponse } from './http'

export interface Controller<T = any> {
  handle: (request: T, response?: Response) => Promise<HttpResponse>
}