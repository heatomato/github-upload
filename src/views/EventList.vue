<template>
  <div class="events-container">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService.js'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  data() {
    return {
      events: null
    }
  },
  created() {
    EventService.getEvents()
    .then( res => {
      console.log('Events: ', res.data);
      this.events = res.data;
    })
    .catch( error => {
      console.log(error);
    })
  },
}
</script>

<style scoped>
.events-container {
  display:flex;
  flex-direction: column;
  align-items: center;
}
</style>
