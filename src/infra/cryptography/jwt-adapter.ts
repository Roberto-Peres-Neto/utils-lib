import jwt from 'jsonwebtoken'
const JWT_SECRET = 'TETETETETETETTETETET'
export const JwtAdapter = {
  decrypt (accessToken: string): any {
    const plaintext: any = jwt.verify(accessToken, JWT_SECRET)
    return plaintext
  },

  getTokenContext (accessToken: string): AccountModel {
    const { context } = JwtAdapter.decrypt(accessToken)
    return context
  }

}

export type AccountModel = {
  login: string
  name: string
  protheusCode: string
  mpfrisoCode: string
  costCenterCode: string
  changePassword: boolean
  roles: any[]
  profiles: string[]
  permissions: string[]
  machineHostname?: string
  platform: string
  commercialManagerId: number
  childCommercialManagerIds: Array<{ id: number, name: string }>
  configurations: Record<string, string>
  uuid: string
}
