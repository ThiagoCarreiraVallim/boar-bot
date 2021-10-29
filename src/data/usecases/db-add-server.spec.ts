import { ServerModel } from '../../domain/models/server'
import { AddServerModel } from '../../domain/usecases/add-server'
import { ServerRepository } from '../protocols/server-repository'
import { DbAddServer } from './db-add-server'

const makeFakeServer = (): AddServerModel => ({
  serverId: 'valid_id',
  name: 'valid_id',
  active: true
})

const makeAddServerRepository = (): ServerRepository => {
  class ServerRepositoryStub implements ServerRepository {
    async add (server: AddServerModel): Promise<string> {
      return await new Promise(resolve => resolve('valid_id'))
    }

    async findByServerId (serverId: string): Promise<ServerModel> {
      return await new Promise(resolve => resolve({
        id: 'valid_id',
        serverId: 'valid_id',
        name: 'valid_name',
        active: true
      }))
    }

    async updateActiveStatus (serverId: string, status: boolean): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new ServerRepositoryStub()
}

interface SutTypes {
  sut: DbAddServer
  serverRepositoryStub: ServerRepository
}

const makeSut = (): SutTypes => {
  const serverRepositoryStub = makeAddServerRepository()
  const sut = new DbAddServer(serverRepositoryStub)

  return { sut, serverRepositoryStub }
}

describe('DbAddServer', () => {
  it('Should calls add with correct values', async () => {
    const { sut, serverRepositoryStub } = makeSut()

    jest.spyOn(serverRepositoryStub, 'findByServerId')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const fakeServer = makeFakeServer()
    const addSpy = jest.spyOn(serverRepositoryStub, 'add')
    await sut.add(fakeServer)

    expect(addSpy).toHaveBeenCalledWith(makeFakeServer())
  })

  it('Should calls findByServerId with correct value', async () => {
    const { sut, serverRepositoryStub } = makeSut()
    const fakeServer = makeFakeServer()

    const addSpy = jest.spyOn(serverRepositoryStub, 'findByServerId')
    await sut.add(fakeServer)

    expect(addSpy).toHaveBeenCalledWith('valid_id')
  })

  it('Should call updateActiveStatus with correct value', async () => {
    const { sut, serverRepositoryStub } = makeSut()
    const fakeServer = makeFakeServer()
    const { serverId, active } = fakeServer
    const addSpy = jest.spyOn(serverRepositoryStub, 'updateActiveStatus')
    await sut.add(fakeServer)

    expect(addSpy).toHaveBeenCalledWith(serverId, active)
  })
})
