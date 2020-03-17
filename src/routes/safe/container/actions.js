// @flow
import loadAddressBookFromStorage from '~/logic/addressBook/store/actions/loadAddressBookFromStorage'
import { updateAddressBookEntry } from '~/logic/addressBook/store/actions/updateAddressBookEntry'
import fetchCurrencyValues from '~/logic/currencyValues/store/actions/fetchCurrencyValues'
import addViewedSafe from '~/logic/currentSession/store/actions/addViewedSafe'
import activateTokensByBalance from '~/logic/tokens/store/actions/activateTokensByBalance'
import fetchTokens from '~/logic/tokens/store/actions/fetchTokens'
import createTransaction from '~/routes/safe/store/actions/createTransaction'
import fetchEtherBalance from '~/routes/safe/store/actions/fetchEtherBalance'
import fetchSafe, { checkAndUpdateSafe } from '~/routes/safe/store/actions/fetchSafe'
import fetchTokenBalances from '~/routes/safe/store/actions/fetchTokenBalances'
import fetchTransactions from '~/routes/safe/store/actions/fetchTransactions'
import processTransaction from '~/routes/safe/store/actions/processTransaction'
import updateSafe from '~/routes/safe/store/actions/updateSafe'
import activateAssetsByBalance from '~/logic/tokens/store/actions/activateAssetsByBalance'
import fetchCollectibles from '~/logic/collectibles/store/actions/fetchCollectibles'

export type Actions = {
  fetchSafe: typeof fetchSafe,
  fetchTokenBalances: typeof fetchTokenBalances,
  createTransaction: typeof createTransaction,
  fetchTransactions: typeof fetchTransactions,
  updateSafe: typeof updateSafe,
  fetchCollectibles: typeof fetchCollectibles,
  fetchTokens: typeof fetchTokens,
  processTransaction: typeof processTransaction,
  fetchEtherBalance: typeof fetchEtherBalance,
  activateTokensByBalance: typeof activateTokensByBalance,
  activateAssetsByBalance: typeof activateAssetsByBalance,
  checkAndUpdateSafeOwners: typeof checkAndUpdateSafe,
  fetchCurrencyValues: typeof fetchCurrencyValues,
  loadAddressBook: typeof loadAddressBookFromStorage,
  updateAddressBookEntry: typeof updateAddressBookEntry,
  addViewedSafe: typeof addViewedSafe,
}

export default {
  fetchSafe,
  fetchTokenBalances,
  createTransaction,
  processTransaction,
  fetchCollectibles,
  fetchTokens,
  fetchTransactions,
  activateTokensByBalance,
  activateAssetsByBalance,
  updateSafe,
  fetchEtherBalance,
  fetchCurrencyValues,
  checkAndUpdateSafeOwners: checkAndUpdateSafe,
  loadAddressBook: loadAddressBookFromStorage,
  updateAddressBookEntry,
  addViewedSafe,
}
