import { ServerModel } from '../../domain/models/server'
import { AddServerModel } from '../../domain/usecases/add-server'
import { ServerRepository } from '../protocols/server-repository'
import { DbAddServer } from './db-add-server'

const makeAddServerRepository = (): ServerRepository => {
  class ServerRepositoryStub implements ServerRepository {
    async add (server: AddServerModel): Promise<string> {
      return await new Promise(resolve => resolve('valid_id'))
    }

    async findByServerId (serverId: string): Promise<ServerModel> {
      return await new Promise(resolve => resolve({
        id: 'valid_id',
        server_id: 'valid_id',
        name: 'valid_name'
      }))
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
  it('Should calls add server repository with correct values', async () => {
    const { sut, serverRepositoryStub } = makeSut()
    const fakeServer = {
      server_id: 'valid_id',
      name: 'valid_id'
    }
    const addSpy = jest.spyOn(serverRepositoryStub, 'add')
    await sut.add(fakeServer)

    expect(addSpy).toHaveBeenCalledWith({
      server_id: 'valid_id',
      name: 'valid_id'
    })
  })
})
