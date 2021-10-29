import { MissingParamError } from '../errors/missing-param-error'
import { ServerData } from './protocols/server-data'

export class BotJoinController {
  handle (serverData: ServerData): any {
    if (!serverData.id) throw new MissingParamError('id')
    if (!serverData.name) throw new MissingParamError('name')
  }
}
