import { createStore } from 'vuex'
import EventService from '../services/EventService.js'

export default createStore({
  state: {
    user: { id: 'ABC123', name: 'Adam Sandler' },
    categories: [
      'Sustaitability',
      'Nature',
      'Animal Welfare',
      'Housing',
      'Education',
      'Food',
      'Community'
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
      console.log('Total Events:', eventsTotal)
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
      .then( res => {
        console.log('Events: ', res.data)
        commit('SET_EVENTS_TOTAL', parseInt(res.headers['x-total-count']))
        commit('SET_EVENTS', res.data)
      })
      .catch( error => {
        console.log('Error fetching events: ', error)
      })
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
        .then( res => {
          commit('SET_EVENT', res.data)
        }).catch( error => {
          console.log('There was an error', error)
        })
      }
    }
  },
  modules: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    } 
  },
})
