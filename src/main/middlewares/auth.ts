import { adaptMiddleware } from "../adapters/express-middleware-adapter"

export const auth = (action?: string, subject?: string | object): any => {
  return adaptMiddleware(makeAuthMiddleware(), action, subject)
}
