
import Chart from 'chart.js/auto'

export class Charter {

    mainChart = document.getElementById('main-chart')

    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August'
    ];

    data = {
        labels: this.months,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45, 66]
        }]
    };

    config = {
        type: "line",
        data: this.data,
        options: {}
    };

    myChart = new Chart(this.mainChart, this.config)
    
}