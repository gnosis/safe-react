// @flow
import React, { Component } from 'react'
import GoogleAnalytics from 'react-ga'
import { useSelector } from 'react-redux'
import { getGoogleAnalyticsTrackingID } from '~/config'
import type { CookiesProps } from '~/logic/cookies/store/model/cookie'
import { cookiesSelector } from '~/logic/cookies/store/selectors'


const trackingID = getGoogleAnalyticsTrackingID()

if (!trackingID) {
  console.error('[GoogleAnalytics] - In order to use google analytics you need to add an trackingID')
} else {
  GoogleAnalytics.initialize(trackingID)
}


const withTracker = (WrappedComponent, options = {}) => {
  const cookiesState: CookiesProps = useSelector(cookiesSelector)
  const { acceptedAnalytics } = cookiesState
  const trackPage = (page) => {
    if (!acceptedAnalytics) {
      return
    }
    GoogleAnalytics.set({
      page,
      ...options,
    })
    GoogleAnalytics.pageview(page)
  }

  // eslint-disable-next-line
  const HOC = class extends Component {
    componentDidMount() {
      // eslint-disable-next-line
      const page = this.props.location.pathname + this.props.location.search;
      trackPage(page)
    }

    componentDidUpdate(prevProps) {
      // eslint-disable-next-line react/prop-types
      const currentPage = prevProps.location.pathname + prevProps.location.search
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      const nextPage = this.props.location.pathname + this.props.location.search

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}

export default withTracker
