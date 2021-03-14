<template>
    <div>
        <ul id="itemsList">
            <li v-for="order in this.orders" v-bind:key = "order.id">
                <p v-for="(quantity, dish) in order[1]" v-bind:key="dish.id"> {{dish}}: {{quantity}} </p>
                <!-- {{getOrderList(order[1])}}-->
                <button v-bind:id= order[0] v-on:click="deleteItem($event)"> Delete </button>
                <button v-bind:id= order[0] v-on:click="route($event)"> Modify </button>
            </li>
            
        </ul>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            orders:[]
        }
    },
    created:function() {
        this.fetchItems()
    },

    methods: {
        fetchItems:function() {
              database.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.orders.push([doc.id, doc.data()]);
                });
            });
        },
        getOrderList:function(order){
            var string = "";
            for (var dish in order) {
                string += dish + ": " + order[dish] + "\n"
            }

            return string
        },
        deleteItem:function(event) { 
            let doc_id = event.target.getAttribute("id");
            //console.log(doc_id)
            database.collection("orders").doc(doc_id).delete().then(()=>{location.reload();});
            
        },
        route:function(event) {
            let user_id = event.target.getAttribute("id") 
            this.$router.push({ name : "MODIFY",
                                params:  { id: user_id} })
        }
    }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>