<template>
  <v-layout
    row
    justify-center
  >
    <v-dialog
      v-model="dialogData.dialogShow"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialogData.dialogShow = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ dialogData.title }} ({{ dialogData.type }})
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>住所</v-list-tile-title>
              <v-list-tile-sub-title>{{ dialogData.address }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>空き情報</v-list-tile-title>
              <v-list-tile-sub-title>{{ dialogData.aki }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>時間</v-list-tile-title>
              <v-list-tile-sub-title>{{ dialogData.start_time }}〜{{ dialogData.end_time }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-btn>閉じる</v-btn>
          <v-btn>詳細</v-btn>
          <v-btn>ブックマーク</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    dialogData: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.v-dialog--fullscreen{
  height: 70%;
  top:30%;
}
</style>
