import { AddServer, AddServerModel } from '../../domain/usecases/add-server'
import { AddServerRepository } from '../protocols/add-server-repository'

export class DbAddServer implements AddServer {
  private readonly addServerRepository: AddServerRepository

  constructor (addServerRepository: AddServerRepository) {
    this.addServerRepository = addServerRepository
  }

  async add (server: AddServerModel): Promise<void> {
    await this.addServerRepository.add(server)
  }
}
