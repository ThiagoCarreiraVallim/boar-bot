import { AddServerModel } from '../../domain/usecases/add-server'

export interface AddServerRepository {
  add: (server: AddServerModel) => Promise<void>
}
