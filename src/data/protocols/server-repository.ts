import { ServerModel } from '../../domain/models/server'
import { AddServerModel } from '../../domain/usecases/add-server'

export interface ServerRepository {
  add: (server: AddServerModel) => Promise<string>
  findByServerId: (server_id: string) => Promise<ServerModel>
}
