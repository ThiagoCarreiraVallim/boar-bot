import { ServerModel } from '../../../../domain/models/server'
import { MongoHelper } from '../helpers/mongo-helper'
import { ServerMongoRepository } from './server-repository'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('servers')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): ServerMongoRepository => {
    return new ServerMongoRepository()
  }

  it('Should create a server when successful', async () => {
    const sut = makeSut()
    const fakeServer = {
      serverId: 'valid_id',
      name: 'valid_name',
      active: true
    }
    const id = await sut.add(fakeServer)
    expect(id).toBeTruthy()
  })

  it('Should return a server when it exists', async () => {
    const sut = makeSut()
    const fakeServer = {
      serverId: 'valid_id',
      name: 'valid_name',
      active: true
    }
    const id = await sut.add(fakeServer)
    expect(id).toBeTruthy()

    const server: ServerModel = await sut.findByServerId('valid_id')
    expect(server).toBeTruthy()
    expect(server.serverId).toBe('valid_id')
    expect(server.name).toBe('valid_name')
  })

  it('Should return null if server not exists', async () => {
    const sut = makeSut()

    const server: ServerModel = await sut.findByServerId('valid_id')
    expect(server).toBeUndefined()
  })

  it('Should update server active status when successful', async () => {
    const sut = makeSut()
    const fakeServer = {
      serverId: 'valid_id',
      name: 'valid_name',
      active: true
    }

    await sut.add(fakeServer)
    let server: ServerModel = await sut.findByServerId('valid_id')
    expect(server.active).toBe(true)
    await sut.updateActiveStatus('valid_id', false)
    server = await sut.findByServerId('valid_id')
    expect(server.active).toBe(false)
  })
})
