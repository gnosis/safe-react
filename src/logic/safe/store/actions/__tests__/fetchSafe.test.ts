import axios from 'axios'

import { buildSafe, fetchSafe } from 'src/logic/safe/store/actions/fetchSafe'
import * as storageUtils from 'src/utils/storage'
import { inMemoryPartialSafeInformation, localSafesInfo, remoteSafeInfoWithoutModules } from './safeInformationMocks'
import { SafeRecordProps } from '../../models/safe'
import { List } from 'immutable'
import { makeOwner } from '../../models/owner'
import { Overwrite } from '../../../../../types/helpers'

jest.mock('axios')
jest.mock('src/utils/storage/index')
describe('buildSafe', () => {
  const SAFE_ADDRESS = '0xe414604Ad49602C0b9c0b08D0781ECF96740786a'
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const storageUtil = require('src/utils/storage/index') as jest.Mocked<typeof storageUtils>

  afterAll(() => {
    jest.unmock('axios')
    jest.unmock('src/utils/storage/index')
  })

  it('should return a Partial SafeRecord with a mix of remote and local safe info', async () => {
    mockedAxios.get.mockImplementationOnce(async () => ({ data: remoteSafeInfoWithoutModules }))
    storageUtil.loadFromStorage.mockImplementationOnce(async () => localSafesInfo)
    const finalValues: Overwrite<Partial<SafeRecordProps>, { name: string }> = {
      name: 'My Safe Name that will last',
      modules: undefined,
      spendingLimits: undefined,
    }

    const builtSafe = await buildSafe(SAFE_ADDRESS, finalValues.name)

    expect(builtSafe).toStrictEqual({ ...inMemoryPartialSafeInformation, ...finalValues })
  })
  it('should return a Partial SafeRecord when `remoteSafeInfo` is not present', async () => {
    jest.spyOn(global.console, 'error').mockImplementationOnce(() => {})
    mockedAxios.get.mockImplementationOnce(async () => {
      throw new Error('-- test -- no resource available')
    })
    const name = 'My Safe Name that will last'
    storageUtil.loadFromStorage.mockImplementationOnce(async () => localSafesInfo)

    const builtSafe = await buildSafe(SAFE_ADDRESS, name)

    expect(builtSafe).toStrictEqual({ ...inMemoryPartialSafeInformation, name })
  })
  it('should return a Partial SafeRecord when `localSafeInfo` is not present', async () => {
    mockedAxios.get.mockImplementationOnce(async () => ({ data: remoteSafeInfoWithoutModules }))
    storageUtil.loadFromStorage.mockImplementationOnce(async () => undefined)
    const name = 'My Safe Name that WILL last'

    const builtSafe = await buildSafe(SAFE_ADDRESS, name)

    expect(builtSafe).toStrictEqual({
      name,
      address: SAFE_ADDRESS,
      threshold: 2,
      owners: List(
        [
          { address: '0xcCdd7e3af1c24c08D8B65A328351e7e23923d875' },
          { address: '0x04Aa5eC2065224aDB15aCE6fb1aAb988Ae55631F' },
          { address: '0x52Da808E9a83FEB147a2d0ca7d2f5bBBd3035C47' },
          { address: '0x4dcD12D11dE7382F9c26D59Db1aCE1A4737e58A2' },
          { address: '0x5e47249883F6a1d639b84e8228547fB289e222b6' },
        ].map(makeOwner),
      ),
      modules: undefined,
      spendingLimits: undefined,
      nonce: 492,
      currentVersion: '1.1.1',
      needsUpdate: false,
      featuresEnabled: ['ERC721', 'ERC1155', 'SAFE_APPS', 'CONTRACT_INTERACTION'],
    })
  })
  it('should return a Partial SafeRecord with only `address` and `name` keys if it fails to recover info', async () => {
    jest.spyOn(global.console, 'error').mockImplementationOnce(() => {})
    mockedAxios.get.mockImplementationOnce(async () => {
      throw new Error('-- test -- no resource available')
    })
    const finalValues: Overwrite<Partial<SafeRecordProps>, { name: string }> = {
      name: 'My Safe Name that will last',
      address: SAFE_ADDRESS,
      owners: undefined,
    }
    storageUtil.loadFromStorage.mockImplementationOnce(async () => undefined)

    const builtSafe = await buildSafe(SAFE_ADDRESS, finalValues.name)

    expect(builtSafe).toStrictEqual(finalValues)
  })
})

describe('fetchSafe', () => {
  it('should dispatch an updateSafe with remoteSafeInfo', () => {})
  it('should dispatch an updateSafe with only `address` if `remoteSafeInfo` is not present', () => {})
  it('should dispatch an updateSafe with locally stored owners names', () => {})
})
