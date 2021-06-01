import axios from 'axios'
import { getNetworkId } from 'src/config'
import { CONFIG_SERVICE_URL } from 'src/utils/constants'

export type AppData = {
  url: string
  name?: string
  disabled?: boolean
  description?: string
  networks: number[]
}

enum Endpoints {
  SAFE_APPS = '/safe-apps/',
}

export const fetchSafeAppsList = async (): Promise<AppData[]> => {
  const networkId = getNetworkId()
  return axios.get(`${CONFIG_SERVICE_URL}${Endpoints['SAFE_APPS']}?network_id=${networkId}`).then(({ data }) => data)
}
