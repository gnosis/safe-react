// @flow
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import { LOAD_ADDRESS, OPEN_ADDRESS, SAFELIST_ADDRESS, SAFE_PARAM_ADDRESS, WELCOME_ADDRESS } from './routes'

import Loader from '~/components/Loader'
import { defaultSafeSelector } from '~/routes/safe/store/selectors'
import { withTracker } from '~/utils/googleAnalytics'

const Welcome = React.lazy(() => import('./welcome/container'))

const Open = React.lazy(() => import('./open/container/Open'))

const Safe = React.lazy(() => import('./safe/container'))

const Load = React.lazy(() => import('./load/container/Load'))

const SAFE_ADDRESS = `${SAFELIST_ADDRESS}/:${SAFE_PARAM_ADDRESS}`

type RoutesProps = {
  location: Object,
  safeLoaded: boolean,
}

const Routes = ({ location, safeLoaded }: RoutesProps) => {
  const [isInitialLoad, setInitialLoad] = useState<boolean>(true)
  const defaultSafe = useSelector(defaultSafeSelector)

  useEffect(() => {
    if (location.pathname !== '/') {
      setInitialLoad(false)
    }
  }, [])

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (!isInitialLoad) {
            return <Redirect to={WELCOME_ADDRESS} />
          }

          if (typeof defaultSafe === 'undefined') {
            return <Loader />
          }

          if (defaultSafe) {
            return <Redirect to={`${SAFELIST_ADDRESS}/${defaultSafe}/balances`} />
          }

          return <Redirect to={WELCOME_ADDRESS} />
        }}
      />
      <Route component={withTracker(Welcome)} exact path={WELCOME_ADDRESS} />
      <Route component={withTracker(Open)} exact path={OPEN_ADDRESS} />
      <Route
        component={withTracker(() => (
          <Safe safeLoaded={safeLoaded} />
        ))}
        path={SAFE_ADDRESS}
      />
      <Route component={withTracker(Load)} exact path={LOAD_ADDRESS} />
      <Redirect to="/" />
    </Switch>
  )
}

export default withRouter(Routes)
