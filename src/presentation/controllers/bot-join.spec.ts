import { BotJoinController } from './bot-join'

describe('Bot Join Controller', () => {
  it('Should throw if invalid server id is provided', () => {
    const sut = new BotJoinController()
    const fakeServerData = {
      id: '',
      name: 'any_name'
    }
    expect(() => sut.handle(fakeServerData)).toThrow()
  })
})
