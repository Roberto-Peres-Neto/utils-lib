export interface IJoiValidation {
  validate: (request: any) => { error: Error, value?: any }
}
