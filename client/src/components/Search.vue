<template>
  <div>
    <div class="reservation-form form-group">
      <label for="select2">Equipements</label>
      <select @change="$emit('update',equipementsSelected);" v-model="equipementsSelectedMutable" multiple="" class="form-control" id="select2">
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
      equipementsSelectedMutable: this.equipementsSelected
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
    },
    roomsOccupied: {
      type: Array
    },
    searchOccupied: {
      type: Function
    },
    datetime: {
      type: Date
    }
  },
  watch: {
    datetime: function () {
      let datetime = new Date(this.date + ' ' + this.time);
      return datetime
    }
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
}
</style>
