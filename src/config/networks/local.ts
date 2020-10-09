import EtherLogo from 'src/assets/icons/icon_etherTokens.svg'
import { EnvironmentSettings, ETHEREUM_NETWORK, NetworkConfig } from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  txServiceUrl: 'http://localhost:8000/api/v1',
  relayApiUrl: 'https://safe-relay.staging.gnosisdev.com/api/v1',
  safeAppsUrl: 'http://localhost:3002',
  gasPriceOracleUrl: 'https://ethgasstation.info/json/ethgasAPI.json',
  rpcServiceUrl: 'http://localhost:4447',
  networkExplorerName: 'Etherscan',
  networkExplorerUrl: 'https://rinkeby.etherscan.io',
  networkExplorerApiUrl: 'https://api-rinkeby.etherscan.io/api',
}

const local: NetworkConfig = {
  environment: {
    production: {
      ...baseConfig,
    },
  },
  network: {
    id: ETHEREUM_NETWORK.LOCAL,
    backgroundColor: '#E8673C',
    textColor: '#ffffff',
    label: 'LocalRPC',
    nativeCoin: {
      address: '0x000',
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      logoUri: EtherLogo,
    },
  },
}

export default local
