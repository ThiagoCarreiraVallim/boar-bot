import { AddServer, AddServerModel } from '../../domain/usecases/add-server'
import { BotJoinController } from './bot-join'

const makeAddServer = (): AddServer => {
  class AddServerStub implements AddServer {
    async add (server: AddServerModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddServerStub()
}

interface SutTypes {
  sut: BotJoinController
  addServerStub: AddServer
}

const makeSut = (): SutTypes => {
  const addServerStub = makeAddServer()
  const sut = new BotJoinController(addServerStub)

  return {
    sut,
    addServerStub
  }
}

describe('Bot Join Controller', () => {
  it('Should throw if invalid server id is provided', async () => {
    const { sut } = makeSut()
    const fakeServerData = {
      serverId: '',
      name: 'any_name',
      active: true
    }
    const promise = sut.handle(fakeServerData)
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if invalid server name is provided', async () => {
    const { sut } = makeSut()
    const fakeServerData = {
      serverId: 'any_id',
      name: '',
      active: true
    }
    const promise = sut.handle(fakeServerData)
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddServer with correct values', async () => {
    const { sut, addServerStub } = makeSut()
    const addSpy = jest.spyOn(addServerStub, 'add')
    const fakeServerData = {
      serverId: 'valid_id',
      name: 'valid_name',
      active: true
    }
    await sut.handle(fakeServerData)
    expect(addSpy).toHaveBeenCalledWith({
      serverId: 'valid_id',
      name: 'valid_name',
      active: true
    })
  })
})
