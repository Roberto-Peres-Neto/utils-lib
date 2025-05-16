import type Joi from 'joi'
import { messages } from 'joi-translation-pt-br'
import { JoiValidationModel, Message } from '../domain/models'
import { ViolationError } from '../presentation/errors/violation-error'
import { IJoiValidation } from '../presentation/protocols'


export class RequiredJoiSchemaValidation implements IJoiValidation {
  constructor (private readonly joiSchema: Joi.Schema) {}

  validate (request: any): JoiValidationModel {
    const { error, value } = this.joiSchema.validate(request, { abortEarly: false, stripUnknown: true, messages })

    if (error) {
      const violations: Message[] = []
      error.details.forEach(detail => {
        violations.push({ type: 'danger', message: detail.message })
      })
      return { error: new ViolationError('Esquema inválido', violations) }
    }

    return { error: null, value }
  }
}
