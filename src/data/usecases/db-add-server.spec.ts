import { AddServerModel } from '../../domain/usecases/add-server'
import { AddServerRepository } from '../protocols/add-server-repository'
import { DbAddServer } from './db-add-server'

const makeAddServerRepository = (): AddServerRepository => {
  class AddServerRepositoryStub implements AddServerRepository {
    async add (server: AddServerModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new AddServerRepositoryStub()
}

interface SutTypes {
  sut: DbAddServer
  addServerRepositoryStub: AddServerRepository
}

const makeSut = (): SutTypes => {
  const addServerRepositoryStub = makeAddServerRepository()
  const sut = new DbAddServer(addServerRepositoryStub)

  return { sut, addServerRepositoryStub }
}

describe('DbAddServer', () => {
  it('Should calls add server repository with correct values', async () => {
    const { sut, addServerRepositoryStub } = makeSut()
    const fakeServer = {
      server_id: 'valid_id',
      name: 'valid_id'
    }
    const addSpy = jest.spyOn(addServerRepositoryStub, 'add')
    await sut.add(fakeServer)

    expect(addSpy).toHaveBeenCalledWith({
      server_id: 'valid_id',
      name: 'valid_id'
    })
  })
})
