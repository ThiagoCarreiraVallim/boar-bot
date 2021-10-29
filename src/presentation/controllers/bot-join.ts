import { MissingParamError } from '../errors/missing-param-error'
import { ServerData } from './protocols/server-data'

export class BotJoinController {
  handle (serverData: ServerData): any {
    const requiredFields = ['name', 'id']
    for (const field of requiredFields) {
      if (!serverData[field]) throw new MissingParamError(field)
    }
  }
}
