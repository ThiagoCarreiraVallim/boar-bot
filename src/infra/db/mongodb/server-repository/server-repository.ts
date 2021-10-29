import { ServerRepository } from '../../../../data/protocols/server-repository'
import { ServerModel } from '../../../../domain/models/server'
import { AddServerModel } from '../../../../domain/usecases/add-server'
import { MongoHelper } from '../helpers/mongo-helper'

export class ServerMongoRepository implements ServerRepository {
  async add (server: AddServerModel): Promise<string> {
    const serverCollection = MongoHelper.getCollection('servers')
    const { insertedId } = await serverCollection.insertOne(server)
    return insertedId.toString()
  }

  async findByServerId (id: string): Promise<ServerModel> {
    const serverCollection = MongoHelper.getCollection('servers')
    const server = await serverCollection.findOne({ server_id: id })
    return MongoHelper.map(server)
  }
}
