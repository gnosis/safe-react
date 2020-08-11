import { TextField } from '@gnosis.pm/safe-react-components'
import createDecorator from 'final-form-calculate'
import React from 'react'
import { useField, useFormState } from 'react-final-form'

import { SafeApp } from 'src/routes/safe/components/Apps/types'
import { getAppInfoFromUrl, getIpfsLinkFromEns, uniqueApp } from 'src/routes/safe/components/Apps/utils'
import { composeValidators, required } from 'src/components/forms/validator'
import Field from 'src/components/forms/Field'
import { isValid as isURLValid } from 'src/utils/url'
import { isValidEnsName } from 'src/logic/wallets/ethAddresses'
import { useDebounce } from 'src/logic/hooks/useDebounce'

const validateUrl = (url: string): string | undefined => (isURLValid(url) ? undefined : 'Invalid URL')

export const appUrlResolver = createDecorator({
  field: 'appUrl',
  updates: {
    appUrl: async (appUrl: string): Promise<string | undefined> => {
      const ensContent = !isURLValid(appUrl) && isValidEnsName(appUrl) && (await getIpfsLinkFromEns(appUrl))

      if (ensContent) {
        return ensContent
      }

      return appUrl
    },
  },
})

export const AppInfoUpdater = ({ onAppInfo }: { onAppInfo: (appInfo: SafeApp) => void }): React.ReactElement => {
  const {
    input: { value: appUrl },
  } = useField('appUrl', { subscription: { value: true } })
  const debouncedValue = useDebounce(appUrl, 500)

  React.useEffect(() => {
    const updateAppInfo = async () => {
      const appInfo = await getAppInfoFromUrl(debouncedValue)
      onAppInfo({ ...appInfo })
    }

    if (isURLValid(debouncedValue)) {
      updateAppInfo()
    }
  }, [debouncedValue, onAppInfo])

  return null
}

const AppUrl = ({ appList }: { appList: SafeApp[] }): React.ReactElement => {
  const { visited } = useFormState({ subscription: { visited: true } })

  // trick to prevent having the field validated by default. Not sure why this happens in this form
  const validate = !visited.appUrl ? undefined : composeValidators(required, validateUrl, uniqueApp(appList))

  return (
    <Field label="App URL" name="appUrl" placeholder="App URL" type="text" component={TextField} validate={validate} />
  )
}

export default AppUrl
