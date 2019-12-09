import _ from 'lodash'

import nurseryTypes from "~/data/nurseryTypes";

const ownershipFilter = (item, filters) => {
  if (_.isEmpty(filters)) {
    return true;
  }

  return (item.nursery.facility.ownership === "公立" && _.includes(filters, "public")) ||
    (item.nursery.facility.ownership === "私立" && _.includes(filters, "private"));
};

const typeFilter = (item, filters) => {
  if (_.isEmpty(filters)) {
    return true;
  }

  const strings = filters.map(f => _.find(nurseryTypes, { id: f } )).map(f => f.name);

  return _.includes(strings, item.nursery.facility.nurseryType);
};

const calculateTime = (timeString) => {
  if (_.isNil(timeString)) {
    return null;
  }

  const list = timeString.split(":");
  return parseInt(list[0]) * 60 + parseInt(list[1]);
};

export default {
  current: state => {
    return state.current;
  },

  items: state => {
    return state.items;
  },

  filteredItems: state => {
    let data = state.items;
    const nurseryTypes = state.filters.nursery.types;
    const ownershipFilters = state.filters.nursery.ownerships;

    data = data.filter(item => typeFilter(item, nurseryTypes));
    data = data.filter(item => ownershipFilter(item, ownershipFilters));

    //保育施設種別
    //以下、未実装
    //園庭:hasYard
    //庭園広さ:areaOfYard
    //プール:hasPool
    //駐車場:hasParkingLot
    //駐車場:numberOfParkingLot

    //保育施設(開園時間と終園時間)
    const selectedOpeningTime = calculateTime(state.filters.nursery.startTime);
    const selectedClosingTime = calculateTime(state.filters.nursery.endTime);

    data = data.filter(row => {
      const openingTime = calculateTime(row.nursery.facility.openingTime);
      const closingTime = calculateTime(row.nursery.facility.closingTime);

      if (selectedOpeningTime != null && selectedOpeningTime < openingTime) {
        return false;
      }

      return !(selectedClosingTime != null && selectedClosingTime > closingTime);
    });

    //保育施設(保育開始年齢と保育終了年齢)

    //■保育サービス
    const serviceProperties = [
      { key: "supportMaternityLeave"},
      { key: "saturdayCareService"},
      { key: "holidayCareService"},
      { key: "temporaryCareService"},
      { key: "spotCareService"},
      { key: "extendedCareService"},
      { key: "nightCareService"},
      { key: "h24CareService"}
    ];

    let hasServiceSelected = _.some(serviceProperties, s => {
      return state.filters.nursery.services && state.filters.nursery.services[s.key]
    });

    if (hasServiceSelected) {
      data = data.filter(row => {
        return _.some(serviceProperties, p => {
          return state.filters.nursery.services[p.key] && row.nursery.service[p.key]
        });
      });
    }

    return data;
  },

  filters: state => {
    return state.filters
  }
};
