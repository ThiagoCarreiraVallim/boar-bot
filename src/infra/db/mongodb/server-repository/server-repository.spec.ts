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
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): ServerMongoRepository => {
    return new ServerMongoRepository()
  }

  it('Should execute without errors when called with valid values', async () => {
    const sut = makeSut()
    const fakeServer = {
      server_id: 'valid_id',
      name: 'valid_name'
    }
    const id = await sut.add(fakeServer)
    expect(id).toBeTruthy()
  })
})
