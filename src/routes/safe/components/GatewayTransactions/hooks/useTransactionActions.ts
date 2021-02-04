import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ExecutionInfo, isCustomTxInfo, Transaction } from 'src/logic/safe/store/models/types/gateway.d'
import { safeParamAddressFromStateSelector } from 'src/logic/safe/store/selectors'
import { getQueuedTransactionsByNonceAndLocation } from 'src/logic/safe/store/selectors/getTransactionDetails'
import { sameAddress } from 'src/logic/wallets/ethAddresses'
import { userAccountSelector } from 'src/logic/wallets/store/selectors'
import { TxLocationContext } from 'src/routes/safe/components/GatewayTransactions/TxLocationProvider'
import { isCancelTransaction } from 'src/routes/safe/components/GatewayTransactions/utils'
import { grantedSelector } from 'src/routes/safe/container/selector'

export const isThresholdReached = (executionInfo: ExecutionInfo): boolean => {
  const { confirmationsSubmitted, confirmationsRequired } = executionInfo
  return confirmationsSubmitted === confirmationsRequired
}

export type TransactionActions = {
  canConfirm: boolean
  canConfirmThenExecute: boolean
  canExecute: boolean
  canCancel: boolean
  isUserAnOwner: boolean
  oneToGo: boolean
}

export const useTransactionActions = (transaction: Transaction): TransactionActions => {
  const currentUser = useSelector(userAccountSelector)
  const safeAddress = useSelector(safeParamAddressFromStateSelector)
  const isUserAnOwner = useSelector(grantedSelector)
  const { txLocation } = useContext(TxLocationContext)
  const { confirmationsSubmitted = 0, confirmationsRequired = 0, missingSigners } = transaction.executionInfo ?? {}
  const transactionsByNonce = useSelector((state) =>
    getQueuedTransactionsByNonceAndLocation(state, transaction.executionInfo?.nonce ?? -1, txLocation),
  )

  const [state, setState] = useState<TransactionActions>({
    canConfirm: false,
    canConfirmThenExecute: false,
    canExecute: false,
    canCancel: false,
    isUserAnOwner,
    oneToGo: false,
  })

  useEffect(() => {
    if (isUserAnOwner && txLocation !== 'history' && transaction.executionInfo) {
      const currentUserSigned = !missingSigners?.some((missingSigner) => sameAddress(missingSigner, currentUser))

      const oneToGo = confirmationsSubmitted === confirmationsRequired - 1
      const canConfirm = ['queued.next', 'queued.queued'].includes(txLocation) && !currentUserSigned
      const thresholdReached = confirmationsSubmitted >= confirmationsRequired

      setState({
        canConfirm,
        canConfirmThenExecute: txLocation === 'queued.next' && canConfirm && oneToGo,
        canExecute: txLocation === 'queued.next' && thresholdReached,
        canCancel: !transactionsByNonce.some(
          ({ txInfo }) =>
            isCustomTxInfo(txInfo) &&
            isCancelTransaction({
              txInfo,
              safeAddress,
            }),
        ),
        isUserAnOwner,
        oneToGo,
      })
    } else {
      setState((prev) => ({ ...prev, isUserAnOwner }))
    }
  }, [
    confirmationsRequired,
    confirmationsSubmitted,
    currentUser,
    isUserAnOwner,
    missingSigners,
    safeAddress,
    transaction,
    transactionsByNonce,
    txLocation,
  ])

  return state
}
