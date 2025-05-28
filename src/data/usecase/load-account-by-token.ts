import { LoadAccountByToken } from "../../domain/models"
import { JwtAdapter } from "../../infra/cryptography"

export class DbLoadAccountByToken implements LoadAccountByToken {
  async load (accessToken: string): Promise<LoadAccountByToken.Result | null> {
    let token: any
    try {
      token = JwtAdapter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const account = token?.context
      if (account) {
        return account
      }
    }
    return null
  }
}
