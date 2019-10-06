<template>
  <v-container
    grid-list-md
    text-xs-center
    pa-0
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs6>
        <v-select
          v-model="filter_category"
          :items="filter_items"
          item-text="label"
          item-value="key"
          label="絞り込み"
          multiple
          chips
          filled
          prepend-inner-icon="filter_list"
        />
      </v-flex>
      <v-flex xs6>
        <v-select
          v-model="sort_category"
          :items="sort_items"
          item-text="label"
          item-value="key"
          label="並び替え"
          chips
          filled
        />
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex xs6>
        <v-btn
          block
          color="grey lighten-3"
        >
          常時
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <v-btn
          block
          color="grey lighten-3"
        >
          新年度
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="item in filtered_centers"
        :key="item.name"
        xs12
      >
        <nursery-card :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NurseryCard from "~/components/nurseries/NurseryCard.vue"

  export default {
    components: {NurseryCard},
    data : function () {

      var  filter_items= [
          { key:'nurserySubType',label:'許認可'},
          { key:'ownershipPublic',label:'公立'},
          { key:'ownershipPrivate',label:'私立'},
          { key:'h24CareService',label:'24時間'},
          { key:'extendedCareService',label:'延長'},
          { key:'temporaryCareService',label:'一時保育 定期'},
          { key:'spotCareService',label:'一時保育 不定期'},
          { key:'nightCareService',label:'夜間・休日'},
          { key:'numberOfParkingLot',label:'駐車場'}
        ];

      var  sort_items= [
          { key:'openingTime',label:'開園時間'},
          { key:'closingTime',label:'閉園時間'},
          { key:'numberOfParkingLot',label:'駐車場'}
        ];
      var sortOrders = {};
    
      Object.keys(sort_items).forEach(function (key) {
        sortOrders[key] = 1
    });

      return {
        filter_items,
        sort_items,
        filter_category:[],
        sort_category:[],
        sortOrders: sortOrders
      }
    },

    computed: {
      ...mapGetters({
        centers: 'center/items'
      }),

      filtered_centers: function () {
        var filter_category = this.filter_category;
        var data = this.centers;

         data = data.filter(function (row) {
            if (~filter_category.indexOf("nurserySubType") && row.nursery.facility.ownership == '認可外保育施設') {
                return false;
            }
            if (~filter_category.indexOf("ownershipPublic") && row.nursery.facility.ownership == '私立') {
                return false;
            }
            if (~filter_category.indexOf("ownershipPrivate") && row.nursery.facility.ownership == '公立') {
                return false;
            }
            if (~filter_category.indexOf("numberOfParkingLot") && row.nursery.facility.hasParkingLot == false) {
                return false;
            }
            if (~filter_category.indexOf("temporaryCareService") && row.nursery.service.temporaryCareService == false) {
                return false;
            }
            if (~filter_category.indexOf("spotCareService") && row.nursery.service.spotCareService == false) {
                return false;
            }
            if (~filter_category.indexOf("nightCareService") && row.nursery.service.nightCareService == false) {
                return false;
            }
            if (~filter_category.indexOf("h24CareService") && row.nursery.service.h24CareService == false) {
                return false;
            }
            if (~filter_category.indexOf("extendedCareService") && row.nursery.service.extendedCareService == false) {
                return false;
            }
            return row;
          })

        var sortKey = this.sort_category;
        var order = this.sortOrders[sortKey] || 1;
        
        if (sortKey == 'numberOfParkingLot') {
            data = data.slice().sort(function(a, b){
                a = a.nursery.facility[sortKey];
                b = b.nursery.facility[sortKey];
                return (a - b) * order;
            });
        }

        if (sortKey == 'openingTime') {
            data = data.slice().sort(function(a, b){
              a = a.nursery.facility[sortKey].toString();
              b = b.nursery.facility[sortKey].toString();
              if(a < b){
                  return -1;
              }else if(a > b){
                  return 1;
              }
              return 0;
            });
        }
        
        if (sortKey == 'closingTime') {
            data = data.slice().sort(function(a, b){
              a = a.nursery.facility[sortKey].toString();
              b = b.nursery.facility[sortKey].toString();
              if(a < b){
                  return -1;
              }else if(a > b){
                  return 1;
              }
              return 0;
            });
        }

        return data;
      }
    },

    async fetch({store}) {
      await store.dispatch('center/search')
    },
  }
</script>
