import { AddServer, AddServerModel } from '../../domain/usecases/add-server'
import { ServerRepository } from '../protocols/server-repository'

export class DbAddServer implements AddServer {
  private readonly serverRepository: ServerRepository

  constructor (serverRepository: ServerRepository) {
    this.serverRepository = serverRepository
  }

  async add (server: AddServerModel): Promise<void> {
    await this.serverRepository.add(server)
  }
}
