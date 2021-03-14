<template>
    <div>
        <div id="itemsList">

            <form v-on:submit.prevent="updateOrder()">
                <p v-for="(quantity, dish) in this.datapacket" v-bind:key = "dish.id">
                    {{dish}}: {{quantity}}<br>
                <input v-model="copy[dish]" placeholder = 0 type="number" min="0">
                    <br>
                </p>
                
                <button type="submit"> Update </button>
            </form>
            
        </div>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            datapacket:{},
            copy:{}

        }
    },
    
    created:function() {
        this.fetchItems();
    },

    methods:{
        fetchItems:function() {
            database.collection('orders').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                    if (doc.id == this.$route.params["id"]) {
                        this.datapacket = doc.data();
                        this.copy = JSON.parse(JSON.stringify(this.datapacket));    
                    }
                });
            });
            //database.collection("orders").doc(this.$route.params["id"]).get().data();
        },
        updateOrder:function() {
            database.collection("orders").doc(this.$route.params["id"]).set(this.copy)
            this.$router.push("/orders")
        }
    }
}
</script>