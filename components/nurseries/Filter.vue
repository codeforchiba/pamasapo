<template>
  <v-toolbar dense flat>
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
            <v-tab-item>
              <v-treeview
                v-model="selectedNurseryTypes"
                :items="nurseryTypes"
                selectable
              />
            </v-tab-item>
            <v-tab-item>
              <v-layout wrap>
                <v-flex xs12>
                  <v-subheader>園種別</v-subheader>
                </v-flex>
                <v-flex offset-xs1 xs5>
                  <v-switch v-model="publicOwnership" label="公立" />
                </v-flex>
                <v-flex offset-xs1 xs5>
                  <v-switch v-model="privateOwnership" label="私立" />
                </v-flex>
              </v-layout>
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
    }
  },

  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },

    apply() {
      this.$emit("applyFilter", {
        nurseryTypes: this.selectedNurseryTypes,
        ownerships: this.ownerships
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
