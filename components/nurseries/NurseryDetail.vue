<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h2>{{ item.name }}</h2>
        <p>({{ item.kana }})</p>
        <v-chip v-if="item.nursery.facility.nurseryOwner">
          {{ item.nursery.facility.nurseryOwner }}
        </v-chip>
        <v-chip>
          {{ item.nursery.facility.nurseryType }}
        </v-chip>
        <v-chip v-if="item.nursery.facility.nurserySubType">
          {{ item.nursery.facility.nurserySubType }}
        </v-chip>
        <v-chip>
          {{ item.nursery.facility.ownership }}
        </v-chip>
        <v-list dense>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>住所</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ address }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>空き情報</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ availabilitySummary }}({{ item.nursery.status.baseDate }})
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            />
            <v-list-item-content>
              0歳 {{ item.nursery.status.availability0 }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            />
            <v-list-item-content>
              1歳 {{ item.nursery.status.availability1 }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            />
            <v-list-item-content>
              2歳 {{ item.nursery.status.availability2 }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            />
            <v-list-item-content>
              3歳 {{ item.nursery.status.availability3 }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            />
            <v-list-item-content>
              4歳 {{ item.nursery.status.availability4 }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>時間</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ period(item.nursery.facility.openingTime, item.nursery.facility.closingTime) }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.phone">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>電話番号</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.phone }}</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.fax">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>FAX番号</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.fax }}</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.email">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>メールアドレス</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.email }}</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.website">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>ウェブサイト</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.website }}</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.opened_on">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>建築年月日</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.opened_on }}</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.rebuild_on">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>改築年月日</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.rebuild_on }}</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.remarks_basic">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>施設基本情報備考</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.remarks_basic }}</v-list-item-content>
          </v-list-item>

          <v-list-item v-if="item.nursery.facility.hasParkingLot">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>駐車場台数</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.facility.numberOfParkingLot }}台</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <FavoriteButton :id="item.id" />
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item>
            <ShowMap
              :access-token="accessToken"
              :lng="item.long"
              :lat="item.lat"
            />
          </v-list-item>
        </v-list>
        <v-subheader>施設</v-subheader>
        <v-list dense>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>時間</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ period(item.nursery.facility.openingTime, item.nursery.facility.closingTime) }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>保育短時間</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ period(item.nursery.facility.standard_opening_time, item.nursery.facility.standard_closing_time) }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>保育短時間</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ period(item.nursery.facility.short_opening_time, item.nursery.facility.short_closing_time) }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>保育年齢</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ facilityAge }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>定員(1号)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.facility.capacity_1 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>定員(2号)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.facility.capacity_2 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>定員(3号)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.facility.capacity_3 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>保育室の広さ</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.facility.area_of_nursery_room }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="item.nursery.facility.has_yard">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>園庭の広さ</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.facility.area_of_yard }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>プール</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.facility.hasPool | ari_nashi }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="item.nursery.facility.hasParkingLot">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>駐車場台数</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.facility.numberOfParkingLot }}台
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>備考</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.facility.remarks_facility }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-subheader>サービス</v-subheader>
        <v-list dense>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>産休明け保育</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.supportMaturnityLeave | maru_batsu }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>土曜保育</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.saturdayCareService | maru_batsu }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>休日保育</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.holidayCareService | maru_batsu }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>一時預かり(定期)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.temporaryCareService | maru_batsu }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>一時預かり(不定期)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.spotCareService | maru_batsu }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>延長保育</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.extendedCareService | maru_batsu }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>夜間保育</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.nightCareService | maru_batsu }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>24時間保育</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.h24CareService | maru_batsu }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>給食</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.provideLunch | maru_batsu }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.service.provideLunch">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>主食(3歳以上)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.lunchWithStaple1 }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.nursery.service.provideLunch">
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>主食(3歳未満)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.lunchWithStaple2 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>おやつ</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.provideSnacks | maru_batsu }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>送迎バス</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.provideShuttleBus | maru_batsu }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>制服</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.useUniform | maru_batsu }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>スモック</v-list-item-title>
            </v-flex>
            <v-list-item-content>{{ item.nursery.service.useSmock | maru_batsu }}</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>体操服</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.useTrainingWear | maru_batsu }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>備考</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.service.remarksService }}
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-subheader>入所状況</v-subheader>
        <v-list dense>
          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所児童数(0歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.numbers0 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所児童数(1歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.numbers1 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所児童数(2歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.numbers2 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所児童数(3歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.numbers3 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所児童数(4歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.numbers4 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所児童数(5歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.numbers5 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所待ち児童数(0歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.standbys0 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所待ち児童数(1歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.standbys1 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所待ち児童数(2歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.standbys2 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所待ち児童数(3歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.standbys3 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所待ち児童数(4歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.standbys4 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所待ち児童数(5歳)</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.standbys5 }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-flex
              xs6
              sm3
            >
              <v-list-item-title>入所状況基準日</v-list-item-title>
            </v-flex>
            <v-list-item-content>
              {{ item.nursery.status.baseDate }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ShowMap from '~/components/nurseries/ShowMap'
import FavoriteButton from '../FavoriteButton'

export default {
  components: {
    FavoriteButton,
    ShowMap
  },

  filters: {
    ari_nashi: function (value) {
      if (value) {
        return 'あり'
      } else {
        return 'なし'
      }
    },

    maru_batsu: function (value) {
      if (value) {
        return '○'
      } else {
        return '✕'
      }
    },
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    accessToken: {
      type: String,
      required: true
    },
  },

  computed: {
    address: function () {
      const item = this.item
      return `${item.prefecture}${item.city}${item.ward}${item.address}`
    },

    facilityAge: function () {
      const facility = this.item.nursery.facility
      if (facility.age_from === undefined || facility.age_to === undefined) {
        return ''
      }
      return `${facility.age_from}歳から${facility.age_to}歳`
    },

    availabilitySummary: function () {
      const status = this.item.nursery.status
      const availabilities = [
        status['availability0'],
        status['availability1'],
        status['availability2'],
        status['availability3'],
        status['availability4'],
        status['availability5']
      ]
      // すべてのitemsが×でなければ空きあり
      const is_available = !(availabilities.every((item) => item === '×'))
      return (is_available) ? 'あり' : 'なし'
    }
  },

  methods: {
    period: function (startTime, endTime) {
      if (startTime === undefined || endTime === undefined) {
        return ''
      }
      return `${startTime} 〜 ${endTime}`
    },
  },
}
</script>
