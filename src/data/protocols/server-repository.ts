import { ServerModel } from '../../domain/models/server'
import { AddServerModel } from '../../domain/usecases/add-server'

export interface ServerRepository {
  add: (server: AddServerModel) => Promise<string>
  findByServerId: (serverId: string) => Promise<ServerModel>
  updateActiveStatus: (serverId: string, status: boolean) => Promise<void>
}
