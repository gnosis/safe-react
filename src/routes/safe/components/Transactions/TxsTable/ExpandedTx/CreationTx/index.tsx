import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { EthHashInfo } from '@gnosis.pm/safe-react-components'

import { Transaction } from 'src/logic/safe/store/models/types/transaction'

import { formatDate } from 'src/routes/safe/components/Transactions/TxsTable/columns'
import Bold from 'src/components/layout/Bold'
import Paragraph from 'src/components/layout/Paragraph'
import Block from 'src/components/layout/Block'
import { TransactionTypes } from 'src/logic/safe/store/models/types/transaction'
import { useExplorerInfo } from 'src/logic/hooks/useExplorerInfo'

const useStyles = makeStyles({
  address: {
    height: '20px',
  },
  txData: {
    alignItems: 'center',
    display: 'flex',
    lineHeight: '1.6',
  },
  txHash: {
    paddingRight: '3px',
  },
})

type Props = {
  tx: Transaction
}

export const CreationTx = ({ tx }: Props): React.ReactElement | null => {
  const classes = useStyles()
  const scanBlockUrl = useExplorerInfo(tx?.creator)
  const scanBlockFactoryAddressUrl = useExplorerInfo(tx?.factoryAddress)
  const scanBlockMasterCopyUrl = useExplorerInfo(tx?.masterCopy)
  if (!tx) {
    return null
  }

  const isCreationTx = tx.type === TransactionTypes.CREATION

  return isCreationTx ? (
    <>
      <Paragraph noMargin>
        <Bold>Created: </Bold>
        {formatDate(tx.created)}
      </Paragraph>
      <Block align="left" className={classes.txData}>
        <Bold className={classes.txHash}>Creator:</Bold>
        {tx.creator ? (
          <EthHashInfo hash={tx.creator} shortenHash={4} showCopyBtn scanBlockUrl={scanBlockUrl} showScanBlocksButton />
        ) : (
          'n/a'
        )}
      </Block>
      <Block align="left" className={classes.txData}>
        <Bold className={classes.txHash}>Factory:</Bold>
        {tx.factoryAddress ? (
          <EthHashInfo
            hash={tx.factoryAddress}
            shortenHash={4}
            showCopyBtn
            scanBlockUrl={scanBlockFactoryAddressUrl}
            showScanBlocksButton
          />
        ) : (
          'n/a'
        )}
      </Block>
      <Block align="left" className={classes.txData}>
        <Bold className={classes.txHash}>Mastercopy:</Bold>
        {tx.masterCopy ? (
          <EthHashInfo
            hash={tx.masterCopy}
            shortenHash={4}
            showCopyBtn
            scanBlockUrl={scanBlockMasterCopyUrl}
            showScanBlocksButton
          />
        ) : (
          'n/a'
        )}
      </Block>
    </>
  ) : null
}
