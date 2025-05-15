export class ManipulationConflictError<T = any> extends Error {
  conflictData: T

  constructor (message: string, conflictData?: T) {
    super(message)
    this.name = 'ManipulationConflictError'
    this.conflictData = conflictData as T
  }
}
