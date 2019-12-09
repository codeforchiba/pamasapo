import _ from 'lodash'

export const state = () => ({
  notificationStack: [],
  currentNotification: undefined
});

export const getters = {
  currentNotification(state) {
    return state.currentNotification
  }
};

export const mutations = {
  NOTIFY(state, notification) {
    state.notificationStack.push(notification);

    if (_.isNil(state.currentNotification)) {
      state.currentNotification = state.notificationStack.shift()
    }
  },

  PROCESS_NOTIFICATION(state) {
    state.currentNotification = state.notificationStack.shift()
  }
}
