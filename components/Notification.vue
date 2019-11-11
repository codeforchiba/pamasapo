<template>
  <v-snackbar v-model="show" :color="messageColor" top :timeout="3000">
    {{ message }}
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'

import { PROCESS_NOTIFICATION } from "../store/mutation-types";

export default {
  data() {
    return {
      show: false,
      message: undefined,
      messageColor: undefined,
      notifications: []
    }
  },

  computed: {
    ...mapGetters({
      currentNotification: 'system/currentNotification'
    })
  },

  watch: {
    notifications(list) {
      if (list.length > 0 && !this.show) {
        this.$nextTick().then(() => {
          const n = _.first(list)

          this.show = true
          this.message = n.message
          this.messageColor = n.type
        })
      }
    },

    currentNotification(notification) {
      if (notification) {
        this.notifications.push({
          type: notification.type,
          message: notification.message
        })
      }
    },

    show(isShow) {
      if (!isShow) {
        this.notifications.shift()
        this.processNotification()
      }
    }
  },

  methods: {
    ...mapMutations({
      processNotification: PROCESS_NOTIFICATION
    })
  }
}
</script>
