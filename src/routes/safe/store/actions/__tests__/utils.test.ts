import { getNewTxNonce, shouldExecuteTransaction } from 'src/routes/safe/store/actions/utils'
import { GnosisSafe } from 'src/types/contracts/GnosisSafe.d'
import { TxServiceModel } from 'src/routes/safe/store/actions/transactions/fetchTransactions/loadOutgoingTransactions'

describe('Store actions utils > getNewTxNonce', () => {
  it(`should return txNonce if it's a valid value`, async () => {
    // Given
    const txNonce = '45'
    const lastTx = { nonce: 44 } as TxServiceModel
    const safeInstance = {}

    // When
    const nonce = await getNewTxNonce(txNonce, lastTx, safeInstance as GnosisSafe)

    // Then
    expect(nonce).toBe('45')
  })

  it(`should return lastTx.nonce + 1 if txNonce is not valid`, async () => {
    // Given
    const txNonce = ''
    const lastTx = { nonce: 44 } as TxServiceModel
    const safeInstance = {
      nonce: () =>
        Promise.resolve({
          toString: () => Promise.resolve('45'),
        }),
    }

    // When
    const nonce = await getNewTxNonce(txNonce, lastTx, safeInstance as any)

    // Then
    expect(nonce).toBe('45')
  })

  it(`should retrieve contract's instance nonce value, if txNonce and lastTx are not valid`, async () => {
    // Given
    const txNonce = ''
    const lastTx = null
    const safeInstance = {
      methods: {
        nonce: () => ({
          call: () => Promise.resolve('45'),
        }),
      },
    }

    // When
    const nonce = await getNewTxNonce(txNonce, lastTx, safeInstance as any)

    // Then
    expect(nonce).toBe('45')
  })
})

describe('Store actions utils > shouldExecuteTransaction', () => {
  it(`should return false if there's a previous tx pending to be executed`, async () => {
    // Given
    const safeInstance = {
      methods: {
        getThreshold: () => ({
          call: () =>
            Promise.resolve({
              toNumber: () => 1,
            }),
        }),
      },
    }
    const nonce = '1'
    const lastTx = { isExecuted: false } as TxServiceModel

    // When
    const isExecution = await shouldExecuteTransaction(safeInstance as any, nonce, lastTx)

    // Then
    expect(isExecution).toBeFalsy()
  })

  it(`should return false if threshold is greater than 1`, async () => {
    // Given
    const safeInstance = {
      methods: {
        getThreshold: () => ({
          call: () =>
            Promise.resolve({
              toNumber: () => 2,
            }),
        }),
      },
    }
    const nonce = '1'
    const lastTx = { isExecuted: true } as TxServiceModel

    // When
    const isExecution = await shouldExecuteTransaction(safeInstance as any, nonce, lastTx)

    // Then
    expect(isExecution).toBeFalsy()
  })

  it(`should return true is threshold is 1 and previous tx is executed`, async () => {
    // Given
    const safeInstance = {
      methods: {
        getThreshold: () => ({
          call: () => Promise.resolve(1),
        }),
      },
    }
    const nonce = '1'
    const lastTx = { isExecuted: true } as TxServiceModel

    // When
    const isExecution = await shouldExecuteTransaction(safeInstance as any, nonce, lastTx)

    // Then
    expect(isExecution).toBeTruthy()
  })
})
