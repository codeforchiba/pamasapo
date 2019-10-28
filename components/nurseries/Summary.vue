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
    <v-list-item v-if="item.nursery.phone">
      <v-list-item-content>
        <v-list-item-subtitle>電話番号</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.phone }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery.fax">
      <v-list-item-content>
        <v-list-item-subtitle>FAX番号</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.fax }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery.email">
      <v-list-item-content>
        <v-list-item-subtitle>メールアドレス</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery.website">
      <v-list-item-content>
        <v-list-item-subtitle>ウェブサイト</v-list-item-subtitle>
        <v-list-item-title>
          <router-link :to="item.nursery.website" target="_blank">
            {{ item.nursery.website }}
          </router-link>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>対象年齢</v-list-item-subtitle>
        <v-list-item-title>{{ targetAge }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          空き状況({{ item.nursery.status.baseDate }}時点)
        </v-list-item-subtitle>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <th
                v-for="availability of availabilities"
                :key="availability.age"
              >
                {{ availability.age }}歳
              </th>
            </thead>
            <tbody>
              <td
                v-for="availability of availabilities"
                :key="availability.age"
              >
                {{ availability.status }}
              </td>
            </tbody>
          </template>
        </v-simple-table>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery.remarks_basic">
      <v-flex xs6 sm3>
        <v-list-item-title>施設基本情報備考</v-list-item-title>
      </v-flex>
      <v-list-item-content>{{ item.nursery.remarks_basic }}</v-list-item-content>
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
      return this.period(
        this.item.nursery.facility.openingTime,
        this.item.nursery.facility.closingTime
      );
    },

    targetAge() {
      return `${this.item.nursery.facility.ageFrom} 〜 ${this.item.nursery.facility.ageTo}歳`;
    },

    availabilities() {
      const from = this.item.nursery.facility.ageFrom;
      const to = this.item.nursery.facility.ageTo;
      const availabilities = [];

      for (let i = from; i <= to; i++) {
        availabilities.push({
          age: i,
          status: this.item.nursery.status[`availability${i}`]
        });
      }

      return availabilities;
    }
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
