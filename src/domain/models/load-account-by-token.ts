export interface LoadAccountByToken {
  load: (accessToken: string) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
  export type Result = {
    login: string
    name: string
    protheusCode: string
    mpfrisoCode: string
    allowedBranches: string[]
    costCenterCode: string
    changePassword: boolean
    roles: any[]
  } | null
}
