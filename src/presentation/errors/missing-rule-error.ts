export class MissingRuleError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'MissingRuleError'
  }
}
