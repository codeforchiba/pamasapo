<template>
  <v-navigation-drawer v-model="drawer" app fixed
                       bottom temporary right
                       width="400" @input="change"
  >
    <v-card flat>
      <v-toolbar class="green lighten-4">
        <v-toolbar-title>絞り込み</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-4">
        <h2 class="heading-6 mb-4">
          施設で絞り込む
        </h2>
        <v-chip-group v-model="selectedCenterTypes" column multiple active-class="green" @change="apply">
          <template v-for="type in centerTypes">
            <v-chip :key="type.id" :value="type.id" outlined>
              {{ type.name }}
            </v-chip>
          </template>
        </v-chip-group>
        <v-divider class="my-8" />
        <h2 class="heading-6 mb-4">
          サービスで絞り込む
        </h2>
        <v-chip-group v-model="selectedServices" column multiple active-class="green" @change="apply">
          <template v-for="service in serviceTypes">
            <v-chip :key="service.id" :value="service.id" outlined>
              {{ service.name }}
            </v-chip>
          </template>
        </v-chip-group>
        <v-divider class="my-8" />
        <h2 class="heading-6 mb-4">
          その他の条件で絞り込む
        </h2>
        <v-subheader>
          運営主体
        </v-subheader>
        <v-chip-group v-model="selectedOwnerships" column multiple active-class="green" @change="apply">
          <template v-for="ownership in ownerships">
            <v-chip :key="ownership.id" :value="ownership.id" outlined>
              {{ ownership.name }}
            </v-chip>
          </template>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import _ from "lodash"
import { mapActions } from "vuex"

import centerTypes from "~/data/centerTypes"
import serviceTypes from "~/data/serviceTypes"
import facilityTypes from "~/data/facilityTypes"

export default {
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      drawer: false,
      selectedCenterTypes: [],
      selectedServices: [],
      selectedOwnerships: [],
      nurseryTypes: centerTypes.nursery,
      afterSchoolTypes: centerTypes.afterSchool,
      commonServiceTypes: serviceTypes.common,
      nurseryServiceTypes: serviceTypes.nursery,
      ownerships: facilityTypes.ownership
    };
  },

  computed: {
    centerTypes() {
      return _.concat(this.nurseryTypes, this.afterSchoolTypes)
    },

    serviceTypes() {
      return _.concat(this.commonServiceTypes, this.nurseryServiceTypes)
    },
  },

  watch: {
    open(value) {
      this.drawer = value
    }
  },

  methods: {
    ...mapActions({
      applyFilter: "center/applyFilter"
    }),

    close() {
      this.$emit('close-drawer')
    },

    change(open) {
      if (!open) {
        this.close()
      }
    },

    apply() {
      this.applyFilter({
        centerTypes: this.selectedCenterTypes,
        ownerships: this.selectedOwnerships,
        services: this.selectedServices
      })
    }
  }
};
</script>
