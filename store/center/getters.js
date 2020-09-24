import _ from 'lodash'

import centerTypes from "~/data/centerTypes"
import serviceTypes from "~/data/serviceTypes"
import facilityTypes from "~/data/facilityTypes"

const typeFilter = (item, filters) => {
  if (_.isEmpty(filters)) {
    return true;
  }

  const centerProperties = _.concat(centerTypes.nursery, centerTypes.afterSchool)
  const strings = filters.map(f => _.find(centerProperties, { id: f } )).map(f => f.name);

  return _.includes(strings, item.type);
};

const serviceFilter = (item, filters) => {
  if (_.isEmpty(filters)) {
    return true
  }

  if (item.nursery) {
    return _.some(_.concat(serviceTypes.common, serviceTypes.nursery), p => {
      return _.includes(filters, p.id) && item.nursery.service[p.key]
    });
  } else {
    if (_.some(serviceTypes.common, p => _.includes(filters, p.id))) {
      return _.some(serviceTypes.common, p => {
        return _.includes(filters, p.id) && item.afterSchool.service[p.key]
      })
    } else {
      return true
    }
  }
}

const ownershipFilter = (item, filters) => {
  if (_.isEmpty(filters)) {
    return true;
  }

  const ownership = item.nursery ? item.nursery.facility.ownership : item.afterSchool.facility.ownership

  if (_.isEmpty(ownership)) {
    return true;
  }

  const ownershipTypes = facilityTypes.ownership
  const strings = filters.map(f => _.find(ownershipTypes, { id: f } )).map(f => f.name);

  return _.includes(strings, ownership);
};

export default {
  current: state => {
    return state.current;
  },

  items: state => {
    return state.items;
  },

  filteredItems: state => {
    let data = state.items

    const typeFilters = state.filters.types
    const ownershipFilters = state.filters.ownerships
    const serviceFilters = state.filters.services

    data = data.filter(item => typeFilter(item, typeFilters))
    data = data.filter(item => ownershipFilter(item, ownershipFilters))
    data = data.filter(item => serviceFilter(item, serviceFilters))

    return data;
  },

  filters: state => {
    return state.filters
  }
};
