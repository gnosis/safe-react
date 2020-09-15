import React from 'react'
import { useSelector } from 'react-redux'
import { Token } from 'src/logic/tokens/store/model/token'
import { ETH_ADDRESS } from 'src/logic/tokens/utils/tokenHelpers'
import { ZERO_ADDRESS } from 'src/logic/wallets/ethAddresses'
import { extendedSafeTokensSelector } from 'src/routes/safe/container/selector'

const useToken = (address: string): Token | undefined => {
  const tokens = useSelector(extendedSafeTokensSelector)

  return React.useMemo(() => {
    if (tokens) {
      const tokenAddress = address === ZERO_ADDRESS ? ETH_ADDRESS : address
      return tokens.find((token) => token.address === tokenAddress) ?? undefined
    }
  }, [address, tokens])
}

export default useToken
