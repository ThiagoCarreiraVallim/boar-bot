import { AddServer, AddServerModel } from '../../domain/usecases/add-server'
import { ServerRepository } from '../protocols/server-repository'

export class DbAddServer implements AddServer {
  private readonly serverRepository: ServerRepository

  constructor (serverRepository: ServerRepository) {
    this.serverRepository = serverRepository
  }

  async add (server: AddServerModel): Promise<void> {
    const { serverId, active } = server
    const serverAlreadyExist = await this.serverRepository.findByServerId(serverId)

    if (serverAlreadyExist) {
      await this.serverRepository.updateActiveStatus(serverId, active)
      return
    }

    await this.serverRepository.add(server)
  }
}
