const limitLength = process.env.recent.limitLength
export const state = () => ({
  items: [],
  limitLength: limitLength
})

export const getters = {
  items: state => {
    return state.items
  }, filter_items: (state, getters, rootState, rootGetters) => (items) => {
    const ids = []
    items.forEach(function (item) {
      ids.push(item.id)
    })

    const ns = rootGetters['nursery/filter_items'](ids);

    const ns_hash = {}
    ns.forEach((nursery) => {
      ns_hash[nursery.id] = nursery
    })

    const nurseries = []
    items.forEach(function (item) {
      let d = new Date(item.timestamp)
      nurseries.push({item: ns_hash[item.id], timestamp: `${d.toLocaleDateString()} ${`${d.getHours()}時${d.getMinutes()}分`}` })
    })

    return nurseries
  },
}

export const mutations = {
  add(state, id) {
    state.items = state.items.filter((item) => { return item.id != id})
    state.items.unshift({ id: id, timestamp: new Date() })
    state.items = state.items.slice(0, state.limitLength)
  },
}