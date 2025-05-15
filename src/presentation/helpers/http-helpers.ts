import { ManipulationConflictError } from "../errors/manipulation-conflict-error"
import { ServerError } from "../errors/server-error"
import { UnauthorizedError } from "../errors/unauthorized-error"
import { HttpResponse } from "../protocols"

export const ok = <T>(data: T): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const manipulationConflictError = <T = any>(error: ManipulationConflictError<T>): HttpResponse => ({
  statusCode: 409,
  body: new ManipulationConflictError<T>(error.message, error.conflictData)
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
body: new ServerError(error.stack || '', error.message)
})
