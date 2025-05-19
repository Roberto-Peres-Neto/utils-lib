import { LogMongoRepository } from "../../../../../infra/dataBase/mongo/log-mongo-repository"
import { Controller } from "../../../../../presentation/protocols"
import { LogControllerDecorator } from "../log-controller-decorator"

export const makeLogControllerDecorator = (controller: Controller, apiName: string): Controller => {
  const logMongoRepository = new LogMongoRepository(apiName) // ⬅️ nome da sua API atual
  return new LogControllerDecorator(controller, logMongoRepository)
}