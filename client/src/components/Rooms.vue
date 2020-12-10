<template>
  <div>
    <div v-for="room in rooms" :key="room.id" class="card border-primary mb-3" style="max-width: 20rem;">
      <div class="card-header">{{ room.name }}</div>
      <div class="card-body">
        <h4 class="card-title">{{ room.name }}</h4>
        <p class="card-text">
          <span>{{ room.description }}</span>
          <br>
          <span>Capacity: {{ room.capacity }}</span>
          <br>
          <span>Equipements: 
            <ul>
              <li v-for="equipement in room.equipements" :key="equipement.name">
                {{ equipement.name }}
              </li>
            </ul>
          </span>
        </p>
        <button v-on:click="book(room)" v-if="datetime" type="button" class="btn btn-primary">Book</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Main',
  props: {
    rooms: {
      type: Array
    },
    datetime: {
      type: Date
    }
  },
  methods: {
    book: function (room) {
      var vm = this;
      axios.post(this.$serverUrl + '/reservations', {
        room: room.name,
        datetime: this.datetime
      }).then(function() {
        alert('Room booked!');
        vm.$emit('update');
      }).catch(function(error) {
        alert(error.response.data);
      })
    }
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
}
</style>
