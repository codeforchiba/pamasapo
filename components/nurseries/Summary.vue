<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>住所</v-list-item-subtitle>
        <v-list-item-title>{{ item.fullAddress }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>開園時間</v-list-item-subtitle>
        <v-list-item-title>{{ businessHours }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.phone">
      <v-list-item-content>
        <v-list-item-subtitle>電話番号</v-list-item-subtitle>
        <v-list-item-title>{{ item.phone }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.fax">
      <v-list-item-content>
        <v-list-item-subtitle>FAX番号</v-list-item-subtitle>
        <v-list-item-title>{{ item.fax }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.email">
      <v-list-item-content>
        <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
        <v-list-item-title>{{ item.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.website">
      <v-list-item-content>
        <v-list-item-subtitle>ウェブサイト</v-list-item-subtitle>
        <v-list-item-title>
          <router-link :to="item.website" target="_blank">
            {{ item.website }}
          </router-link>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery && (item.nursery.facility.ageFrom || item.nursery.facility.ageTo)">
      <v-list-item-content>
        <v-list-item-subtitle>対象年齢</v-list-item-subtitle>
        <v-list-item-title>{{ targetAge }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.remarks">
      <v-flex xs6 sm3>
        <v-list-item-title>施設基本情報備考</v-list-item-title>
      </v-flex>
      <v-list-item-content>{{ item.remarks }}</v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    businessHours() {
      let openingTime;
      let closingTime;
      
      if(this.item.nursery)
      {
        openingTime = this.item.nursery.facility.openingTime;
        closingTime = this.item.nursery.facility.closingTime;
      }
      else if(this.item.afterSchool)
      {
        openingTime = this.item.afterSchool.facility.openingTime;
        closingTime = this.item.afterSchool.facility.closingTime;
      }

      return this.period(
        openingTime,
        closingTime
      );
    },

    targetAge() {
      return `${this.item.nursery.facility.ageFrom} 〜 ${this.item.nursery.facility.ageTo}歳`;
    },
  },

  methods: {
    period: function(startTime, endTime) {
      if (startTime && endTime) {
        return `${startTime} 〜 ${endTime}`;
      }

      return "";
    }
  }
};
</script>
