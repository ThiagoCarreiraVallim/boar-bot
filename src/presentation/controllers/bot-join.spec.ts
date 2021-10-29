import { BotJoinController } from './bot-join'

const makeSut = (): BotJoinController => {
  return new BotJoinController()
}

describe('Bot Join Controller', () => {
  it('Should throw if invalid server id is provided', () => {
    const sut = makeSut()
    const fakeServerData = {
      id: '',
      name: 'any_name'
    }
    expect(() => sut.handle(fakeServerData)).toThrow()
  })

  it('Should throw if invalid server name is provided', () => {
    const sut = makeSut()
    const fakeServerData = {
      id: 'any_id',
      name: ''
    }
    expect(() => sut.handle(fakeServerData)).toThrow()
  })
})
