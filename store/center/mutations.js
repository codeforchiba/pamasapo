import { serializeError } from "serialize-error";
import _ from "lodash";

function generateTags(item) {
  let tags = [
    { type: "basic", value: item.nursery.facility.ownership },
    { type: "basic", value: item.nursery.facility.nurseryType }
  ];

  if (item.nursery.service.supportMaternityLeave) {
    tags.push({ type: "service", value: "産休明け" });
  }

  if (item.nursery.service.saturdayCareService) {
    tags.push({ type: "service", value: "土曜可" });
  }

  if (item.nursery.service.holidayCareService) {
    tags.push({ type: "service", value: "休日可" });
  }

  if (item.nursery.service.temporarCareService) {
    tags.push({ type: "service", value: "一時(定期)" });
  }

  if (item.nursery.service.spotCareService) {
    tags.push({ type: "service", value: "一時(不定期)" });
  }

  if (item.nursery.service.extendedCareService) {
    tags.push({ type: "service", value: "延長" });
  }

  if (item.nursery.service.nightCareService) {
    tags.push({ type: "service", value: "夜間" });
  }

  if (item.nursery.service.h24CareService) {
    tags.push({ type: "service", value: "24時間" });
  }

  return tags;
}

export default {
  SEARCH_CENTER(state) {
    state.loading = true;
  },

  SEARCH_CENTER_SUCCESS(state, data) {
    state.items = _.map(data.search.items, item => {
      item.tags = generateTags(item);
      return item;
    });
    state.loading = false;
  },

  SEARCH_CENTER_FAILURE(state, error) {
    state.error = serializeError(error);
    state.loading = false;
  }
};
