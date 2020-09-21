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
    <v-list-item v-if="item.nursery && item.nursery.phone">
      <v-list-item-content>
        <v-list-item-subtitle>電話番号</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.phone }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.afterSchool && item.afterSchool.phone">
      <v-list-item-content>
        <v-list-item-subtitle>電話番号</v-list-item-subtitle>
        <v-list-item-title>{{ item.afterSchool.phone }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery && item.nursery.fax">
      <v-list-item-content>
        <v-list-item-subtitle>FAX番号</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.fax }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.afterSchool && item.afterSchool.fax">
      <v-list-item-content>
        <v-list-item-subtitle>FAX番号</v-list-item-subtitle>
        <v-list-item-title>{{ item.afterSchool.fax }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery && item.nursery.email">
      <v-list-item-content>
        <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.afterSchool && item.afterSchool.email">
      <v-list-item-content>
        <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
        <v-list-item-title>{{ item.afterSchool.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery && item.nursery.website">
      <v-list-item-content>
        <v-list-item-subtitle>ウェブサイト</v-list-item-subtitle>
        <v-list-item-title>
          <router-link :to="item.nursery.website" target="_blank">
            {{ item.nursery.website }}
          </router-link>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.afterSchool && item.afterSchool.website">
      <v-list-item-content>
        <v-list-item-subtitle>ウェブサイト</v-list-item-subtitle>
        <v-list-item-title>
          <router-link :to="item.afterSchool.website" target="_blank">
            {{ item.afterSchool.website }}
          </router-link>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery">
      <v-list-item-content>
        <v-list-item-subtitle>対象年齢</v-list-item-subtitle>
        <v-list-item-title>{{ targetAge }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.remarks_basic">
      <v-flex xs6 sm3>
        <v-list-item-title>施設基本情報備考</v-list-item-title>
      </v-flex>
      <v-list-item-content>{{ item.remarks_basic }}</v-list-item-content>
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
