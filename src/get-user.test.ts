import { getUser } from './get-user'

describe('getUser', () => {
  test('should return a resposne', async () => {
    // in a real project, you would use Axios/fetch and mock the get method
    const result = await getUser()
    expect(result).toEqual({ id: '1', name: 'Anthony' })
  })
})
