export const state = () => ({
  current: undefined,
  items: [],
  mapHistory:{
    center: undefined,
    zoom: undefined,
  },
  filteredItems: [],
  filters: {
    nursery: {
      types: [],
      ownerships: [],
      services: []
    },
  },
  error: undefined,
  loading: false,
});
