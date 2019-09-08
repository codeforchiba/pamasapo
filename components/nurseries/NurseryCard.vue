<template>
  <v-card>
    <v-img
      :src="default_image"
      contain
      aspect-ratio="1"
      max-height="300"
    ></v-img>
      <span class="subtitle-1">【{{item.nursery.facility.ownership}}:{{item.nursery.facility.nurseryType}}】</span>
    <v-card-title>
      {{ item.name }}
      <span class="subtitle-1">
        ({{ item.kana }})
      </span>
    </v-card-title>
    <v-card-text>
      <span>住所　{{ item.postalCode + item.prefecture + item.city + item.ward + item.address }}</span><br>
      <span>開園時間　{{ item.nursery.facility.openingTime }}から{{ item.nursery.facility.closingTime }}まで</span><br>
      <span v-if='item.nursery.facility.numberOfParkingLot>0'>駐車場 あり{{ item.nursery.facility.numberOfParkingLot }}台</span>
      <span v-else>駐車場 なし</span><br>
      <span>サービス:夜間休日({{ item.nursery.service.nightCareService | maru_batsu }})</span>
      <span>一時保育 定期({{ item.nursery.service.temporaryCareService | maru_batsu}})</span>
      <span>一時保育 不定期({{ item.nursery.service.spotCareService | maru_batsu}})</span>
      <span>延長({{ item.nursery.service.extendedCareService | maru_batsu}})</span>
      <span>24時間({{ item.nursery.service.h24CareService | maru_batsu}})</span><br>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="{ name: 'nurseries-id', params: { id: item.id }}">
        詳細表示
      </v-btn>
      <favorite-button :id="item.id" />
    </v-card-actions>
  </v-card>
</template>
<script>
import DefaultImage from "~/assets/image.png"
import FavoriteButton from "~/components/FavoriteButton"

  export default {
    name: 'NurseryCard',
    components: {FavoriteButton},
      data() {
          return {
              default_image: DefaultImage
          }
      },
      filters: {
        maru_batsu: function (value) {
          if (value) {
            return '○'
          } else {
            return '✕'
          }
        },
      },
    props: {
      item: {}
    }
  },

  data() {
    return {
      default_image: DefaultImage
    }
  },
}
</script>
