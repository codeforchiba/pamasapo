<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          空き状況({{ availabilityBaseDate }}時点)
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-row>
          <v-col v-for="availability in availabilities" :key="availability.age" :cols="flexSize">
            <v-card flat>
              <p class="title text-center">
                {{ availability.age }}歳
              </p>
              <p class="text-center">
                {{ availability.status }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          入所状況({{ statusBaseDate }}時点)
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-row>
          <v-col v-for="status in statuses" :key="status.age" :cols="flexSize">
            <v-card flat>
              <p class="title text-center">
                {{ status.age }}歳
              </p>
              <p class="text-center status">
                入所中 {{ status.count }}名<br>
                待機中 {{ status.standby }}名
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    baseDate() {
      return DateTime.fromFormat(this.item.nursery.status.baseDate, 'yyyy-LL-dd');
    },

    availabilityBaseDate() {
      return this.baseDate.toFormat('yyyy-LL-dd');
    },

    statusBaseDate() {
      return this.baseDate.minus({ months: 1 }).toFormat('yyyy-LL-dd');
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
    },

    statuses() {
      const from = this.item.nursery.facility.ageFrom;
      const to = this.item.nursery.facility.ageTo;
      const statuses = [];

      for (let i = from; i <= to; i++) {
        statuses.push({
          age: i,
          count: this.item.nursery.status[`numbers${i}`],
          standby: this.item.nursery.status[`standbys${i}`]
        });
      }

      return statuses;
    },

    flexSize() {
      return this.$vuetify.breakpoint.smAndUp ? 2 : 4
    }
  }
}
</script>

<style scoped>
p.status {
  line-height: 1.6;
}
</style>
