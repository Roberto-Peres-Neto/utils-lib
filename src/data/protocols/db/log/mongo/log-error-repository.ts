export interface LogErrorRepository {
  logError: (request: LogErrorRepository.Request) => Promise<void>
}

export namespace LogErrorRepository {
  export type Request = {
    // url: string
    // method: string
    // body: any
    // headers: any
    // params: any
    // query: any
    // ip: string
    // userAgent: string
    // statusCode: number
    // error: Error

    stack: string
    errorMessage: string
    request: any
  }
}