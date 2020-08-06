import { List, Map, Record } from 'immutable'

import { ZERO_ADDRESS } from 'src/logic/wallets/ethAddresses'
import {
  PendingActionType,
  TransactionProps,
  TransactionStatus,
  TransactionTypes,
} from 'src/routes/safe/store/models/types/transaction'

export const makeTransaction = Record<TransactionProps>({
  baseGas: 0,
  blockNumber: 0,
  cancelled: false,
  confirmations: List([]),
  created: false,
  creator: '',
  creationTx: false,
  customTx: false,
  data: null,
  dataDecoded: null,
  decimals: 18,
  decodedParams: {},
  executionDate: '',
  executionTxHash: undefined,
  executor: '',
  factoryAddress: '',
  gasPrice: '0',
  gasToken: ZERO_ADDRESS,
  isCancellationTx: false,
  isCollectibleTransfer: false,
  isExecuted: false,
  isSuccessful: true,
  isTokenTransfer: false,
  masterCopy: '',
  modifySettingsTx: false,
  multiSendTx: false,
  nonce: 0,
  operation: 0,
  origin: null,
  ownersWithPendingActions: Map({ [PendingActionType.CONFIRM]: List([]), [PendingActionType.REJECT]: List([]) }),
  recipient: '',
  refundParams: null,
  refundReceiver: ZERO_ADDRESS,
  safeTxGas: 0,
  safeTxHash: '',
  setupData: '',
  status: TransactionStatus.PENDING,
  submissionDate: '',
  symbol: '',
  transactionHash: '',
  type: TransactionTypes.OUTGOING,
  upgradeTx: false,
  value: '0',
})
