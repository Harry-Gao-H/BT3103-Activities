import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [],
            //colors : ['red','blue','yellow','green','purple','brown']
        },
        options: {
            legend: { 
                display: true,
                
            },
            title: {
              display: true,
              text: 'PSI 24 Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        },
        indice : {
            "west" : 0,
            "national" : 1,
            "east" : 2,
            "central" : 3,
            "south" : 4,
            "north" : 5
        }
    }
  },
  methods: {
    fetchItems: function () {
        var regions = ["west", "national", "east", "central", "south", "north" ];
        var colors = ['#db5853','#437ede','#d2d907','#30a82c','#930ff7','brown']
        for (let i = 0; i < 6; i++) {
            this.datacollection.datasets[i] = {
                data : [],
                backgroundColor : colors[i],
                borderColor : colors[i],
                fill: false,
                label: regions[i]
            }
        }


        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data.items.forEach(data => { 
                this.datacollection.labels.push(data["timestamp"])
                console.log(data)
                var psi = data.readings.psi_twenty_four_hourly;
                var keys = Object.keys(psi)

                for (let i = 0; i < keys.length; i++) {
                    this.datacollection.datasets[this.indice[keys[i]]].data.push(psi[keys[i]])
                }
                
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}


