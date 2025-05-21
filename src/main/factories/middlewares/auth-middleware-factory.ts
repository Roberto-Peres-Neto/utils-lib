import { Middleware } from "../../../presentation/protocols/middleware"

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken())
}
