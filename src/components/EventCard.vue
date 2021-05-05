<template>
  <router-link class="event-link" :to="{ name: 'EventDetails', params: { id: event.id } }">
    <div class="event-card">
      <!-- Display event data -->
      <span>@ {{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link> 
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid black;
  margin-bottom: 18px;
}

.event-link {
  color:blue;
  text-decoration: none;
}
</style>
