<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>給食</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.service.provideLunch | ariNashi }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <template v-if="item.nursery.service.provideLunch">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitem>主食(3歳以上)</v-list-item-subtitem>
          <v-list-item-title>{{ item.nursery.service.lunchWithStaple1 }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>主食(3歳未満)</v-list-item-subtitle>
          <v-list-item-title>{{ item.nursery.service.lunchWithStaple2 }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>おやつ</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.service.provideSnacks | ariNashi }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>送迎バス</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.service.provideShuttleBus | ariNashi }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>制服</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.service.useUniform | ariNashi }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>スモック</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.service.useSmock | ariNashi }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>体操服</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.service.useTrainingWear | ariNashi }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery.service.remarksService">
      <v-list-item-content>
        <v-list-item-subtitle>備考</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.service.remarksService }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  filters: {
    ariNashi: function(value) {
      if (value) {
        return "あり";
      } else {
        return "なし";
      }
    }
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
