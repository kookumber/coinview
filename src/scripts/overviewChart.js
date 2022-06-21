
import Chart from 'chart.js/auto'

export class Charter {

    constructor(labels, dataSetOne, dataSetTwo, dataSetThree){
        this.labels = labels
        this.dataSetOne = dataSetOne
        this.dataSetTwo = dataSetTwo
        this.dataSetThree = dataSetThree
        this.dataSets = {
            labels: this.labels,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(38, 70, 83)',
                borderColor: 'rgb(38, 70, 83)',
                data: this.dataSetOne
            },
            {
                label: 'Second set',
                backgroundColor: 'rgb(42, 157, 143)',
                borderColor: 'rgb(42, 157, 143)',
                data: this.dataSetTwo
            },
            {
                label: 'Third Set',
                backgroundColor: 'rgb(233, 196, 106)',
                borderColor: 'rgb(233, 196, 106)',
                data: this.dataSetThree
            }]
        }

        this.mainChart = document.getElementById('main-chart')

        this.config = {
            type: "line",
            data: this.dataSets,
            options: {
                animation: {
                    type: 'number',
                    easing: 'linear',
                    delay: 350,
                    from: 3
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Market Cap Over Time",
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    }

    renderChart () {
        return new Chart(this.mainChart, this.config)
    }
    
}