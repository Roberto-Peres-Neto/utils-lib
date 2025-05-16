export interface IJoiValidation {
  validate: (request: any) => {
    error: Error | null
    value?: any
  }
}
