import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { getTxData } from './utils'

import EtherscanLink from 'src/components/EtherscanLink'
import Block from 'src/components/layout/Block'
import Bold from 'src/components/layout/Bold'
import LinkWithRef from 'src/components/layout/Link'
import Paragraph from 'src/components/layout/Paragraph'
import { getNameFromAddressBook } from 'src/logic/addressBook/store/selectors'

import { shortVersionOf } from 'src/logic/wallets/ethAddresses'
import OwnerAddressTableCell from 'src/routes/safe/components/Settings/ManageOwners/OwnerAddressTableCell'
import { getTxAmount } from 'src/routes/safe/components/Transactions/TxsTable/columns'

import { lg, md } from 'src/theme/variables'
import { Transaction } from 'src/routes/safe/store/models/types/transaction'

import { SAFE_METHODS_NAMES, SafeMethods } from 'src/routes/safe/store/models/types/transactions.d'

export const TRANSACTIONS_DESC_ADD_OWNER_TEST_ID = 'tx-description-add-owner'
export const TRANSACTIONS_DESC_REMOVE_OWNER_TEST_ID = 'tx-description-remove-owner'
export const TRANSACTIONS_DESC_CHANGE_THRESHOLD_TEST_ID = 'tx-description-change-threshold'
export const TRANSACTIONS_DESC_SEND_TEST_ID = 'tx-description-send'
export const TRANSACTIONS_DESC_CUSTOM_VALUE_TEST_ID = 'tx-description-custom-value'
export const TRANSACTIONS_DESC_CUSTOM_DATA_TEST_ID = 'tx-description-custom-data'
export const TRANSACTIONS_DESC_ADD_MODULE_TEST_ID = 'tx-description-add-module'
export const TRANSACTIONS_DESC_REMOVE_MODULE_TEST_ID = 'tx-description-remove-module'
export const TRANSACTIONS_DESC_NO_DATA = 'tx-description-no-data'

export const styles = createStyles({
  txDataContainer: {
    paddingTop: lg,
    paddingLeft: md,
    paddingBottom: md,
  },
  txData: {
    wordBreak: 'break-all',
  },
  txDataParagraph: {
    whiteSpace: 'normal',
  },
  linkTxData: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
})

interface TransferDescriptionProps {
  amount: string
  recipient: string
}

const TransferDescription = ({ amount = '', recipient }: TransferDescriptionProps): React.ReactElement => {
  const recipientName = useSelector((state) => getNameFromAddressBook(state, recipient))
  return (
    <Block data-testid={TRANSACTIONS_DESC_SEND_TEST_ID}>
      <Bold>Send {amount} to:</Bold>
      {recipientName ? (
        <OwnerAddressTableCell address={recipient} knownAddress showLinks userName={recipientName} />
      ) : (
        <EtherscanLink knownAddress={false} type="address" value={recipient} />
      )}
    </Block>
  )
}

interface RemovedOwnerProps {
  removedOwner: string
}

const RemovedOwner = ({ removedOwner }: RemovedOwnerProps): React.ReactElement => {
  const ownerChangedName = useSelector((state) => getNameFromAddressBook(state, removedOwner))

  return (
    <Block data-testid={TRANSACTIONS_DESC_REMOVE_OWNER_TEST_ID}>
      <Bold>Remove owner:</Bold>
      {ownerChangedName ? (
        <OwnerAddressTableCell address={removedOwner} knownAddress showLinks userName={ownerChangedName} />
      ) : (
        <EtherscanLink knownAddress={false} type="address" value={removedOwner} />
      )}
    </Block>
  )
}

interface AddedOwnerProps {
  addedOwner: string
}

const AddedOwner = ({ addedOwner }: AddedOwnerProps): React.ReactElement => {
  const ownerChangedName = useSelector((state) => getNameFromAddressBook(state, addedOwner))

  return (
    <Block data-testid={TRANSACTIONS_DESC_ADD_OWNER_TEST_ID}>
      <Bold>Add owner:</Bold>
      {ownerChangedName ? (
        <OwnerAddressTableCell address={addedOwner} knownAddress showLinks userName={ownerChangedName} />
      ) : (
        <EtherscanLink knownAddress={false} type="address" value={addedOwner} />
      )}
    </Block>
  )
}

interface NewThresholdProps {
  newThreshold: string
}

const NewThreshold = ({ newThreshold }: NewThresholdProps): React.ReactElement => (
  <Block data-testid={TRANSACTIONS_DESC_CHANGE_THRESHOLD_TEST_ID}>
    <Bold>Change required confirmations:</Bold>
    <Paragraph noMargin size="md">
      {newThreshold}
    </Paragraph>
  </Block>
)

interface AddModuleProps {
  module: string
}

const AddModule = ({ module }: AddModuleProps): React.ReactElement => (
  <Block data-testid={TRANSACTIONS_DESC_ADD_MODULE_TEST_ID}>
    <Bold>Add module:</Bold>
    <EtherscanLink value={module} knownAddress={false} type="address" />
  </Block>
)

interface RemoveModuleProps {
  module: string
}

const RemoveModule = ({ module }: RemoveModuleProps): React.ReactElement => (
  <Block data-testid={TRANSACTIONS_DESC_REMOVE_MODULE_TEST_ID}>
    <Bold>Remove module:</Bold>
    <EtherscanLink value={module} knownAddress={false} type="address" />
  </Block>
)

interface SettingsDescriptionProps {
  action: SafeMethods
  addedOwner?: string
  newThreshold?: string
  removedOwner?: string
  module?: string
}

const SettingsDescription = ({
  action,
  addedOwner,
  newThreshold,
  removedOwner,
  module,
}: SettingsDescriptionProps): React.ReactElement => {
  if (action === SAFE_METHODS_NAMES.REMOVE_OWNER && removedOwner && newThreshold) {
    return (
      <>
        <RemovedOwner removedOwner={removedOwner} />
        <NewThreshold newThreshold={newThreshold} />
      </>
    )
  }

  if (action === SAFE_METHODS_NAMES.CHANGE_THRESHOLD && newThreshold) {
    return <NewThreshold newThreshold={newThreshold} />
  }

  if (action === SAFE_METHODS_NAMES.ADD_OWNER_WITH_THRESHOLD && addedOwner && newThreshold) {
    return (
      <>
        <AddedOwner addedOwner={addedOwner} />
        <NewThreshold newThreshold={newThreshold} />
      </>
    )
  }

  if (action === SAFE_METHODS_NAMES.SWAP_OWNER && removedOwner && addedOwner) {
    return (
      <>
        <RemovedOwner removedOwner={removedOwner} />
        <AddedOwner addedOwner={addedOwner} />
      </>
    )
  }

  if (action === SAFE_METHODS_NAMES.ENABLE_MODULE && module) {
    return <AddModule module={module} />
  }

  if (action === SAFE_METHODS_NAMES.DISABLE_MODULE && module) {
    return <RemoveModule module={module} />
  }

  return (
    <Block data-testid={TRANSACTIONS_DESC_NO_DATA}>
      <Bold>No data available for current transaction</Bold>
    </Block>
  )
}

const TxData = (props) => {
  const { classes, data } = props
  const [showTxData, setShowTxData] = useState(false)
  const showExpandBtn = data.length > 20
  return (
    <Paragraph className={classes.txDataParagraph} noMargin size="md">
      {showExpandBtn ? (
        <>
          {showTxData ? (
            <>
              {data}{' '}
              <LinkWithRef
                aria-label="Hide details of the transaction"
                className={classes.linkTxData}
                onClick={() => setShowTxData(false)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Show Less
              </LinkWithRef>
            </>
          ) : (
            <>
              {shortVersionOf(data, 20)}{' '}
              <LinkWithRef
                aria-label="Show details of the transaction"
                className={classes.linkTxData}
                onClick={() => setShowTxData(true)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Show More
              </LinkWithRef>
            </>
          )}
        </>
      ) : (
        data
      )}
    </Paragraph>
  )
}

const CustomDescription = ({ amount = 0, classes, data, recipient }: any) => {
  const recipientName = useSelector((state) => getNameFromAddressBook(state, recipient))
  return (
    <>
      <Block data-testid={TRANSACTIONS_DESC_CUSTOM_VALUE_TEST_ID}>
        <Bold>Send {amount} to:</Bold>
        {recipientName ? (
          <OwnerAddressTableCell address={recipient} knownAddress showLinks userName={recipientName} />
        ) : (
          <EtherscanLink knownAddress={false} type="address" value={recipient} />
        )}
      </Block>
      <Block className={classes.txData} data-testid={TRANSACTIONS_DESC_CUSTOM_DATA_TEST_ID}>
        <Bold>Data (hex encoded):</Bold>
        <TxData classes={classes} data={data} />
      </Block>
    </>
  )
}

const useStyles = makeStyles(styles)

type TxDescriptionProps = {
  tx: Transaction
}

const TxDescription = ({ tx }: TxDescriptionProps): React.ReactElement => {
  const {
    action,
    addedOwner,
    cancellationTx,
    creationTx,
    customTx,
    data,
    modifySettingsTx,
    module,
    newThreshold,
    recipient,
    removedOwner,
    upgradeTx,
  } = getTxData(tx)
  const classes = useStyles()
  const [amount, setAmount] = useState(null)

  useMemo(() => {
    const fetchTxAmount = async () => {
      const amount = await getTxAmount(tx, false)
      setAmount(amount)
    }
    fetchTxAmount()
  }, [tx])

  if (!amount?.length) return null

  return (
    <Block className={classes.txDataContainer}>
      {modifySettingsTx && action && (
        <SettingsDescription
          action={action}
          addedOwner={addedOwner}
          newThreshold={newThreshold}
          removedOwner={removedOwner}
          module={module}
        />
      )}
      {!upgradeTx && customTx && <CustomDescription amount={amount} data={data} recipient={recipient} storedTx={tx} />}
      {upgradeTx && <div>{data}</div>}
      {!cancellationTx && !modifySettingsTx && !customTx && !creationTx && !upgradeTx && (
        <TransferDescription amount={amount} recipient={recipient} />
      )}
    </Block>
  )
}

export default TxDescription
