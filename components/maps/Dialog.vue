<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialogData.dialogShow"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialogData.dialogShow = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ dialogData.title }} ({{ dialogData.type }})
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>住所</v-list-item-title>
              <v-list-item-subtitle>{{ dialogData.address }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>空き情報</v-list-item-title>
              <v-list-item-subtitle>{{ dialogData.aki }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>時間</v-list-item-title>
              <v-list-item-subtitle>
                {{ dialogData.start_time }}〜{{ dialogData.end_time }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
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
  }
};
</script>

<style scoped>
.v-dialog--fullscreen {
  height: 70%;
  top: 30%;
}
</style>
