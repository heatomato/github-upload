<template>
  <div class="event-create">
    <h1>Create an event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories</p>
   <!-- <p>{{ getEventById(2) }}</p>-->

    <form @submit.prevent="createEvent">

      <label>Select a Category   </label>
      <select>
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select> 

  
      <h3>Name and describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input v-model="event.title" type="text" placeholder="Add an event title"/>
      </div>

      <div class="field">
        <label>Description</label>
        <input v-model="event.description" type="text" placeholder="Add a description"/>
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label>Locations</label>
        <input v-model="event.location" type="text" placeholder="Add a location"/>
      </div>

      <h3>When is your event happening?</h3>
      <div class="field">
        <label>Date</label>
       <!-- <datepicker v-model="picked"/>-->
      </div>

      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit"/>

    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import  Datepicker  from 'vue3-datepicker'

export default({
  components:{
    Datepicker
  },
  data() {
    const picked = new Date()
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    createEvent() {
      this.$store.dispatch('createEvent', this.event).then(() => {
        this.$router.push({
          name: 'EventDetails',
          params: { id: this.event.id }
        })
        this.event = this.createFreshEvent()
      }).catch ((error) => {
        console.log('Error creating event: ', error)
      })
    },
    createFreshEvent() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  computed: {
    catLength() {
      return this.$store.getters.catLength
    },
    ...mapGetters(['getEventById']),
    ...mapState(['user']) //, 'categories'
  }
})
</script>

<style scoped>
  .field {
    margin-bottom: 24px;
  }
</style>