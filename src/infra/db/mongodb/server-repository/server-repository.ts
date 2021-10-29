import { AddServerRepository } from '../../../../data/protocols/add-server-repository'
import { AddServerModel } from '../../../../domain/usecases/add-server'
import { MongoHelper } from '../helpers/mongo-helper'

export class ServerMongoRepository implements AddServerRepository {
  async add (server: AddServerModel): Promise<string> {
    const serverCollection = MongoHelper.getCollection('servers')
    const { insertedId } = await serverCollection.insertOne(server)
    return insertedId.toString()
  }
}
