import { AddServer } from '../../domain/usecases/add-server'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerData } from '../protocols/server-data'

export class BotJoinController {
  private readonly addServer: AddServer

  constructor (addServer: AddServer) {
    this.addServer = addServer
  }

  async handle (serverData: ServerData): Promise<void> {
    const requiredFields = ['name', 'serverId', 'active']
    for (const field of requiredFields) {
      if (!serverData[field]) throw new MissingParamError(field)
    }

    const { serverId, name, active } = serverData
    await this.addServer.add({ serverId, name, active })
  }
}
