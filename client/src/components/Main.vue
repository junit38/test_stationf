<template>
  <div class="reservations">
    <h2>Reservations</h2>
    <Search v-bind:equipements="equipements"
      v-bind:capacity="capacity"
      v-bind:equipementsSelected="equipementsSelected"
      v-on:update-equipementsSelected="equipementsSelected = $event"
      v-bind:capacitySelected="capacitySelected"
      v-on:update-capacitySelected="capacitySelected = $event"
      v-on:search-occupied="searchOccupied()"
      v-on:update-datetime="datetime = $event"/>
    <Rooms v-on:update="searchOccupied()"
      v-if="searched"
      v-bind:rooms="roomsFiltered"
      v-bind:datetime="datetime"/>
  </div>
</template>

<script>
import axios from 'axios';
import Rooms from './Rooms.vue'
import Search from './Search.vue'

export default {
  name: 'Main',
  components: {
    Rooms,
    Search
  },
  data () {
    return {
      rooms: [],
      capacity: [],
      equipements: [],
      capacitySelected: [],
      equipementsSelected: [],
      roomsOccupied: [],
      datetime: null,
      searched: false
    }
  },
  mounted () {
    axios
      .get(this.$serverUrl + '/rooms')
      .then(response => {
        this.rooms = response.data.rooms;
        this.capacity = this.rooms.map(function(room) {
          return room.capacity;
        });
        this.capacity = this.capacity.filter(function(capacity, index, self) {
          return self.indexOf(capacity) === index;
        })
        for (let i = 0; i < this.rooms.length; i++) {
          for (let j = 0; j < this.rooms[i].equipements.length; j++) {
            if (this.equipements.indexOf(this.rooms[i].equipements[j].name) == -1)
              this.equipements.push(this.rooms[i].equipements[j].name)
          }
        }
      })
  },
  computed: {
    roomsFiltered: function () {
      let vm = this;

      function containEquipementRoom(room, equipement) {
        for (let i = 0; i < room.equipements.length; i++) {
          if (room.equipements[i].name == equipement)
            return true;
        }
        return false;
      }

      function containEquipement(room) {
        for (let i = 0; i < vm.equipementsSelected.length; i++) {
          if (!containEquipementRoom(room, vm.equipementsSelected[i]))
            return false;
        }
        return true;
      }

      function containRoomName(room) {
        for (let i = 0; i < vm.roomsOccupied.length; i++) {
          if (room.name === vm.roomsOccupied[i])
            return true;
        }
        return false;
      }

      return this.rooms.filter(function (room) {
          return (vm.capacitySelected.length == 0 || vm.capacitySelected.indexOf(room.capacity) != -1) &&
          (vm.equipementsSelected.length == 0 || containEquipement(room)) &&
          (vm.roomsOccupied.length == 0 || !containRoomName(room));
      })
    }
  },
  methods: {
    searchOccupied: function () {
      this.roomsOccupied = [];
      axios.post(this.$serverUrl + '/reservations/occupied', {
        datetime: this.datetime
      }).then(response => {
        this.searched = true;
        for (var i = 0; i < response.data.length; i++) {
          this.roomsOccupied.push(response.data[i].room)
        }
      }).catch(error => {
        alert(error.response.data);
      })
    }
  }
}
</script>

<style scoped>
.reservations {
  margin-top: 30px;
}
</style>
