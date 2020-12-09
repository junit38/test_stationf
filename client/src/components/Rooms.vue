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
      axios.post('http://0.0.0.0:3000/rooms', {
        room: room.name,
        datetime: this.datetime
      });
      console.log(room);
    }
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
}
</style>
