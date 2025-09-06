import { DbLoadAccountByToken } from "../../../data/usecase/load-account-by-token"
import { LoadAccountByToken } from "../../../domain/models"

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  return new DbLoadAccountByToken()
}