// @flow
import * as React from 'react'
import { SnackbarProvider } from 'notistack'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Backdrop from '~/components/layout/Backdrop'
import CookiesBanner from '~/components/CookiesBanner'
import Header from '~/components/Header'
import Img from '~/components/layout/Img'
import Notifier from '~/components/Notifier'
import SidebarProvider from '~/components/Sidebar'
import { ETHEREUM_NETWORK } from '~/logic/wallets/getWeb3'
import { getNetwork } from '~/config'
import { networkSelector } from '~/logic/wallets/store/selectors'
import AlertIcon from './assets/alert.svg'
import CheckIcon from './assets/check.svg'
import ErrorIcon from './assets/error.svg'
import InfoIcon from './assets/info.svg'
import styles from './index.scss'

type Props = {
  children: React.Node,
  currentNetwork: string,
}

const desiredNetwork = getNetwork()

const PageFrame = ({ children, currentNetwork }: Props) => {
  const isWrongNetwork = currentNetwork !== ETHEREUM_NETWORK.UNKNOWN && currentNetwork !== desiredNetwork

  return (
    <div className={styles.frame}>
      <Backdrop isOpen={isWrongNetwork} />
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          error: <Img src={ErrorIcon} alt="Error" />,
          info: <Img src={InfoIcon} alt="Info" />,
          success: <Img src={CheckIcon} alt="Success" />,
          warning: <Img src={AlertIcon} alt="Warning" />,
        }}
      >
        <Notifier />
        <SidebarProvider>
          <Header />
          {children}
        </SidebarProvider>
      </SnackbarProvider>
      <CookiesBanner />
    </div>
  )
}

export default connect((state) => ({ currentNetwork: networkSelector(state) }), null)(PageFrame)
