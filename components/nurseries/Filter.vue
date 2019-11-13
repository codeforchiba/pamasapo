<template>
  <v-toolbar dense text flat>
    <v-toolbar-title>
      <v-img :src="logoPath" width="220px" height="32px" contain />
    </v-toolbar-title>
    <div class="flex-grow-1" />
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <template #activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <v-card :class="cardClass" hover>
        <v-card-text>
          <v-tabs>
            <v-tab>保育施設種別</v-tab>
            <v-tab>保育施設属性</v-tab>
            <v-tab>保育サービス</v-tab>
            <v-tab-item>
              <v-treeview
                v-model="selectedNurseryTypes"
                :items="nurseryTypes"
                selectable
              />
            </v-tab-item>
            <v-tab-item>
              <v-row dense>
                <v-col cols="12">
                  <v-subheader>園種別</v-subheader>
                </v-col>
                <v-col offset="1" cols="5">
                  <v-switch v-model="publicOwnership" label="公立" />
                </v-col>
                <v-col offset="1" cols="5">
                  <v-switch v-model="privateOwnership" label="私立" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-subheader>開園時間</v-subheader>
                </v-col>
                <v-col offset="1" cols="4">
                  <v-menu ref="startTimeMenu" v-model="startTimePicker"
                          max-width="290px" min-width="290px"
                          :close-on-content-click="false"
                  >
                    <template #activator="{ on: onStart }">
                      <v-text-field v-model="startTime" readonly v-on="onStart" />
                    </template>
                    <v-time-picker v-if="startTimePicker" v-model="startTime"
                                   full-width
                                   @click:minute="$refs.startTimeMenu.save(startTime)"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-card flat>
                    <v-card-text class="text-center">
                      〜
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <v-menu ref="endTimeMenu" v-model="endTimePicker"
                          max-width="290px" min-width="290px"
                          :close-on-content-click="false"
                  >
                    <template #activator="{ on: onEnd }">
                      <v-text-field v-model="endTime" readonly v-on="onEnd" />
                    </template>
                    <v-time-picker v-if="endTimePicker" v-model="endTime"
                                   full-width
                                   @click="$refs.endTimeMenu.save(endTime)"
                    />
                  </v-menu>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row dense>
                <v-col offset="1" cols="11">
                  <v-switch v-model="supportMaternityLeave" label="産休明け保育" />
                </v-col>
                <v-col offset="1" cols="11">
                  <v-switch v-model="saturdayCareService" label="土曜日対応" />
                </v-col>
                <v-col offset="1" cols="11">
                  <v-switch v-model="holidayCareService" label="休日対応" />
                </v-col>
                <v-col offset="1" cols="11">
                  <v-switch v-model="temporaryCareService" label="一時利用(定期)" />
                </v-col>
                <v-col offset="1" cols="11">
                  <v-switch v-model="spotCareService" label="一時利用(不定期)" />
                </v-col>
                <v-col offset="1" cols="11">
                  <v-switch v-model="extendedCareService" label="延長保育対応" />
                </v-col>
                <v-col offset="1" cols="11">
                  <v-switch v-model="nightCareService" label="夜間保育対応" />
                </v-col>
                <v-col offset="1" cols="11">
                  <v-switch v-model="h24CareService" label="24時間保育対応" />
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn color="green darken-1" text @click="toggleDialog">
            キャンセル
          </v-btn>
          <v-btn color="green darken-1" text @click="apply">
            絞り込み
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
import _ from "lodash";
import nurseryTypes from "~/data/nurseryTypes";

export default {
  data() {
    return {
      dialog: false,
      selectedNurseryTypes: [],
      publicOwnership: false,
      privateOwnership: false,
      startTime: null,
      startTimePicker: false,
      endTime: null,
      endTimePicker: false,
      supportMaternityLeave: false,
      saturdayCareService: false,
      holidayCareService: false,
      temporaryCareService: false,
      spotCareService: false,
      extendedCareService: false,
      nightCareService: false,
      h24CareService: false,
      nurseryTypes: nurseryTypes
    };
  },

  computed: {
    logoPath() {
      return require("@/assets/logo.png");
    },

    cardClass() {
      return ["mobile"];
    },

    ownerships() {
      return _.compact([
        this.publicOwnership ? "public" : null,
        this.privateOwnership ? "private" : null
      ]);
    },

    services() {
      return {
        supportMaternityLeave: this.supportMaternityLeave,
        saturdayCareService: this.saturdayCareService,
        holidayCareService: this.holidayCareService,
        temporaryCareService: this.temporaryCareService,
        spotCareService: this.spotCareService,
        extendedCareService: this.extendedCareService,
        nightCareService: this.nightCareService,
        h24CareService: this.h24CareService
      }
    }
  },

  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },

    apply() {
      this.$emit("applyFilter", {
        nurseryTypes: this.selectedNurseryTypes,
        ownerships: this.ownerships,
        startTime: this.startTime,
        endTime: this.endTime,
        services: this.services
      });

      this.toggleDialog();
    }
  }
};
</script>

<style lang="scss">
.v-dialog--fullscreen > .v-card.mobile {
  padding-bottom: 60px;
}
</style>
