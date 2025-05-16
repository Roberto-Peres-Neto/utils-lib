import { Message } from "../../domain/models"

export class ViolationError extends Error {
  violations: Message[]
  constructor (message: string, violations: Message[]) {
    super(message)
    this.name = 'ViolationError'
    this.violations = violations
  }
}
