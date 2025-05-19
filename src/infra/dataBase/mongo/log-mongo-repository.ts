import { LogErrorRepository } from "../../../data/protocols"
import { MongoHelper } from "../mongo-helper"

export class LogMongoRepository implements LogErrorRepository {
  constructor(private readonly apiName: string) {}

  async logError(request: LogErrorRepository.Request): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      request,
      date: new Date(),
      apiName: this.apiName
    })
  }
}
