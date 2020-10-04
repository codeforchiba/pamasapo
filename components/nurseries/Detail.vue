<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content v-if="item.nursery">
        <v-list-item-subtitle>定員</v-list-item-subtitle>
        <v-list-item-title>
          3歳未満児(3号) {{ item.nursery.facility.capacity1 }}名 /
          3歳以上児(2号) {{ item.nursery.facility.capacity2 }}名
          <template v-if="item.nursery.facility.capacity3">
            / 教育認定(1号) {{ item.nursery.facility.capacity3 }}名
          </template>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery && item.nursery.facility.areaOfNurseryRoom">
      <v-list-item-content>
        <v-list-item-subtitle>保育室の広さ</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.facility.areaOfNurseryRoom }}㎡</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery && item.nursery.facility.hasYard">
      <v-list-item-content>
        <v-list-item-subtitle>園庭の広さ</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.facility.areaOfYard }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="item.nursery && item.nursery.facility.hasParkingLot">
      <v-list-item-content>
        <v-list-item-subtitle>駐車場台数</v-list-item-subtitle>
        <v-list-item-title>{{ item.nursery.facility.numberOfParkingLot }}台</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>備考</v-list-item-subtitle>
        <v-list-item-title>{{ remarks }}</v-list-item-title>
      </v-list-item-content>
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
    address: function() {
      const item = this.item;
      return `${item.prefecture}${item.city}${item.ward}${item.address}`;
    },

    facilityAge: function() {
      const facility = this.item.nursery.facility;
      if (facility.age_from === undefined || facility.age_to === undefined) {
        return "";
      }
      return `${facility.age_from}歳から${facility.age_to}歳`;
    },

    availabilitySummary: function() {
      const status = this.item.nursery.status;
      const availabilities = [
        status["availability0"],
        status["availability1"],
        status["availability2"],
        status["availability3"],
        status["availability4"],
        status["availability5"]
      ];
      // すべてのitemsが×でなければ空きあり
      const is_available = !availabilities.every(item => item === "×");
      return is_available ? "あり" : "なし";
    },

    remarks() {
      if (this.item.nursery) {
        return this.item.nursery.facility.remarks
      } else if (this.item.afterSchool) {
        return this.item.afterSchool.facility.remarks
      } else {
        return null
      }
    }
  },

  methods: {
    period: function(startTime, endTime) {
      if (startTime === undefined || endTime === undefined) {
        return "";
      }
      return `${startTime} 〜 ${endTime}`;
    }
  }
};
</script>
