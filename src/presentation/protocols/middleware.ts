import { type HttpResponse } from './http'

export interface Middleware<T = any, action = string, subject = string | object> {
  handle: (httpRequest: T, actionRequest?: action, subjectRquest?: subject) => Promise<HttpResponse>
}
