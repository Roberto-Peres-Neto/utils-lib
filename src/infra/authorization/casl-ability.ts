import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { AccountModel } from '../cryptography'

export type Actions = 'read' | 'create' | 'update' | 'delete'
export type Subjects = string | 'all'

export class CaslAbilityFactory {
  static createForUser (user: AccountModel) {
    const { can, build } = new AbilityBuilder(createMongoAbility)

    // Exemplo: permissions = [{ action: 'read', subject: 'GuiasFinanceiro' }]
    user.permissions?.forEach((rule: any) => {
      can(rule.action, rule.subject)
    })

    return build()
  }
}