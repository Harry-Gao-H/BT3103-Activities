<template>
  <div>
      <p>Menu: </p>
      <ul>
          <li v-for="item in itemsSelected" v-bind:key="item[0]">
              {{item[0]}} x {{item[1]}}
          </li>
      </ul>
        <button v-on:click="display();sendOrder()"> Calculate Total </button>
        <div v-show="this.show">
            <p>Subtotal: ${{getSubtotal}}</p>
            <p>Grand Total: ${{getGrandTotal}}</p>
        </div>
  </div>
</template>

<script>
import database from "../firebase.js"

export default {
    name: 'Basket',
    data() {
      return{
          counter: 0,
          show: false
      }

    },
    props: {
      itemsSelected: {
        type : Array
      }
    },
    methods:{
        display: function() {
            this.show = true
        },
        
        sendOrder:function(){
            var thisOrder = {
              "Prawn omelette": 0,
              "Dry Beef Hor Fun": 0,
              "Sambal KangKung": 0,
              "Pork Fried Rice": 0,
              "Mapo Tofu" : 0,
              "Cereal Prawn": 0
            };
            for(let i = 0; i < this.itemsSelected.length;i++) {
              var thisItem = this.itemsSelected[i];
              thisOrder[thisItem[0]] = thisItem[1]
            }

            database.collection("orders").add(
                thisOrder
              ).then(() => {location.reload()} )
        },
    },

    computed: {
      getSubtotal: function() {
          var sum = 0;
          for (let i = 0; i < this.itemsSelected.length; i++) {
              var item = this.itemsSelected[i]
              sum+= item[1] * item[2]
          }
          //this.subtotal = sum;
          return sum
      },
        getGrandTotal: function() {
          //this.grandTotal = this.subtotal * 1.07
          var sum = 0;
          for (let i = 0; i < this.itemsSelected.length; i++) {
              var item = this.itemsSelected[i]
              sum+= item[1] * item[2]
          }
          return (sum*1.07).toFixed(2)
      }

  },
}
</script>

<style scoped>
button {
  background-color: darksalmon;
  border-color: antiquewhite;
  font-size: 30px;
}

</style>