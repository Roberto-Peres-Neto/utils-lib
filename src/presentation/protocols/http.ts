import { Message } from "../../domain/models"

export type HttpResponse<T = any, D = any> = {
  statusCode: number
  body: T & {
    violations?: Message[]
    conflictData?: D
  }
}
