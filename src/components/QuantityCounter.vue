<template>
  <div>
    <button v-on:click="decrease"> - </button>
    {{counter}}
    <button v-on:click="increase"> + </button>
  </div>
</template>

<script>


export default {
  name: 'QuantityCounter',
  data() {
      return{
          counter: 0
      }

  },
  methods: {
      decrease: function() {
          if (this.counter > 0) {
              this.counter--;
              this.$emit('counter', this.item, this.counter)
          }
      },
      increase: function() {
          if (this.counter < 10) {
              this.counter++;
              this.$emit('counter', this.item, this.counter)
          } else {
              alert("You cannot buy more than 10 items.")
          }
      },
    
  },
  props: {
      item : {
          type: Object
      }
  }
}
</script>

<style>
</style>
