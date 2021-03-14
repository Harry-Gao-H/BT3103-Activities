import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number",
                backgroundColor: [],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        var first = true;
        var colors = ['#db5853','#437ede','#d2d907','#30a82c','#930ff7','brown']
        var record = {};
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
            var data = doc.data()
            if (first) {
                var keys = Object.keys(data)
                for (let i = 0; i < keys.length; i++) {
                    record[keys[i]] = parseInt(data[keys[i]])
                }
                first = false
            } else {
                keys = Object.keys(data)
                for (let i = 0; i < keys.length; i++) {
                    record[keys[i]] = parseInt(data[keys[i]]) + record[keys[i]]
                }
            } 
            
        })

        var keys = Object.keys(record)
        for (let i = 0; i < keys.length; i++) {
            this.datacollection.labels.push(keys[i])
            this.datacollection.datasets[0].data.push(record[keys[i]])
            //random color generator
            this.datacollection.datasets[0].backgroundColor.push(colors[i])
        }
        
            
            
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}
