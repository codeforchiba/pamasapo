import { serializeError } from "serialize-error"
import _ from "lodash"

import centerTypes from "~/data/centerTypes"
import serviceTypes from "~/data/serviceTypes"

function generateTags(item) {
  const serviceProperties = _.concat(serviceTypes.common, serviceTypes.nursery)

  let tags = [
    { type: "basic", value: item.type }
  ]

  if (item.nursery) {
    if (!_.isEmpty(item.nursery.facility.ownership)) {
      tags.push({type: "basic", value: item.nursery.facility.ownership})
    }
    serviceProperties.forEach(p => {
      if (item.nursery.service[p.key]) {
        tags.push({ type: "service", value: p.label })
      }
    })
  } else {
    if (!_.isEmpty(item.afterSchool.facility.ownership)) {
      tags.push({ type: "basic", value: item.afterSchool.facility.ownership })
    }
    serviceProperties.forEach(p => {
      if (item.afterSchool.service[p.key]) {
        tags.push({ type: "service", value: p.label })
      }
    })
  }

  return tags
}

function generateType(item) {
  if (item.nursery) {
    const type = _.find(centerTypes.nursery, { value: item.nursery.facility.nurseryType })
    return type.name
  } else {
    return 'こどもルーム'
  }
}

function fullAddress(item) {
  return `${item.prefecture}${item.city}${item.ward}${item.address}`
}

function extendProps(item) {
  item.type = generateType(item)
  item.tags = generateTags(item)
  item.fullAddress = fullAddress(item)
  return item
}

export default {
  LOAD_CENTER(state) {
    state.loading = true
  },

  LOAD_CENTER_SUCCESS(state, data) {
    data = extendProps(data)
    state.current = data
    state.loading = false
  },

  LOAD_CENTER_FAILURE(state, error) {
    state.error = serializeError(error)
    state.loading = false
  },

  SEARCH_CENTER(state) {
    state.loading = true
  },

  SEARCH_CENTER_SUCCESS(state, data) {
    state.items = _.map(data.search.items, item => extendProps(item))
    state.loading = false
  },

  SEARCH_CENTER_FAILURE(state, error) {
    state.error = serializeError(error)
    state.loading = false
  },

  APPLY_FILTER(state, filter) {
    state.filters = filter
  }
}
