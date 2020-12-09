<template>
  <div>
    <div class="reservation-form form-group">
      <label for="date">Date</label>
      <input type="date" class="form-control" id="date" placeholder="Enter datetime" v-model="date">
    </div>
    <div class="reservation-form form-group">
      <label for="time">Time</label>
      <input type="time" class="form-control" id="time" placeholder="Enter datetime" v-model="time">
    </div>
    <div class="form-group">
      <button v-on:click="emitSearchOccupied()" class="btn btn-primary">Search</button>
    </div>
    <div class="reservation-form form-group">
      <label for="select">Capacity</label>
      <select v-on:change="$emit('update-capacitySelected', capacitySelectedMutable);" v-model="capacitySelectedMutable" multiple="" class="form-control" id="select">
        <option v-for="option in capacity" v-bind:value="option" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="reservation-form form-group">
      <label for="select2">Equipements</label>
      <select v-on:change="$emit('update-equipementsSelected', equipementsSelectedMutable);" v-model="equipementsSelectedMutable" multiple="" class="form-control" id="select2">
        <option v-for="option in equipements" v-bind:value="option" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Main',
  data () {
    return {
      date: null,
      time: null,
      equipementsSelectedMutable: this.equipementsSelected,
      capacitySelectedMutable: this.capacitySelected
    }
  },
  props: {
    capacity: {
      type: Array
    },
    equipements: {
      type: Array
    },
    capacitySelected: {
      type: Array
    },
    equipementsSelected: {
      type: Array
    }
  },
  watch: {
    date: function () {
      let datetime = new Date(this.date + ' ' + this.time);
      this.$emit('update-datetime', datetime);
    },
    time: function () {
      let datetime = new Date(this.date + ' ' + this.time);
      this.$emit('update-datetime', datetime);
    }
  },
  methods: {
    emitSearchOccupied: function() {
      if (!(this.date && this.time)) {
        alert('Please choose a date and a time');
        return;
      }
      this.$emit('search-occupied');
    }
  }
}
</script>

<style scoped>
.reservation-form {
  width: 50%;
  display: inline-block;
}
</style>
