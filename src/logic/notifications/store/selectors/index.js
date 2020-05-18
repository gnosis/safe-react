// 
import { List, Map } from 'immutable'
import { createSelector } from 'reselect'

import { } from 'src/logic/notifications/store/models/notification'
import { NOTIFICATIONS_REDUCER_ID } from 'src/logic/notifications/store/reducer/notifications'
import { } from 'src/store'

const notificationsMapSelector = (state) => state[NOTIFICATIONS_REDUCER_ID]

export const notificationsListSelector = createSelector(notificationsMapSelector, (notifications) =>
  notifications.toList(),
)
