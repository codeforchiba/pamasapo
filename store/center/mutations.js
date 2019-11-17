import { serializeError } from "serialize-error";
import _ from "lodash";

const serviceProperties = [
  { key: "supportMaternityLeave", label: "産休明け" },
  { key: "saturdayCareService", label: "土曜可" },
  { key: "holidayCareService", label: "休日可" },
  { key: "temporaryCareService", label: "一時(定期)" },
  { key: "spotCareService", label: "一時(不定期)" },
  { key: "extendedCareService", label: "延長" },
  { key: "nightCareService", label: "夜間" },
  { key: "h24CareService", label: "24時間" }
];

function generateTags(item) {
  let tags = [
    { type: "basic", value: item.nursery.facility.ownership },
    { type: "basic", value: item.nursery.facility.nurseryType }
  ];

  serviceProperties.forEach(p => {
    if (item.nursery.service[p.key]) {
      tags.push({ type: "service", value: p.label });
    }
  });

  return tags;
}

function fullAddress(item) {
  return `${item.prefecture}${item.city}${item.ward}${item.address}`;
}

function extendProps(item) {
  item.tags = generateTags(item);
  item.fullAddress = fullAddress(item);
  return item;
}

export default {
  LOAD_CENTER(state) {
    state.loading = true;
  },

  LOAD_CENTER_SUCCESS(state, data) {
    data = extendProps(data);
    state.current = data;
    state.loading = false;
  },

  LOAD_CENTER_FAILURE(state, error) {
    state.error = serializeError(error);
    state.loading = false;
  },

  SEARCH_CENTER(state) {
    state.loading = true;
  },

  SEARCH_CENTER_SUCCESS(state, data) {
    state.items = _.map(data.search.items, item => extendProps(item));
    state.loading = false;
  },

  SEARCH_CENTER_FAILURE(state, error) {
    state.error = serializeError(error);
    state.loading = false;
  },

  APPLY_FILTER(state, filter) {
    state.filters.nurseryTypes = filter.nurseryTypes;
    state.filters.ownerships = filter.ownerships;
  },

  APPLY_FILTER_SUCCESS(state, filteredItems, filter) {
    state.filteredItems = filteredItems;
    console.log(filter);
  }
};
