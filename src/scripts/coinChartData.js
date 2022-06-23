
import { Charter } from './overviewChart.js'

export class CoinChartData{

    constructor(){
        this.coinOneData = []
        this.coinTwoData = []
        this.coinThreeData = []
        this.dateArr = []
        this.selectedCoins = this.getSelectedVals() //["btc", "eth"]
        
    }

    async updateCoinArrs(){
        
        const dateVals = document.getElementsByName("daterange")[0].value.split(" - ")
        
        let startDate = dateVals[0]
        let endDate = dateVals[1]

        for(let i = 0; i < 3; i++){
            const coinStr = this.selectedCoins[i]
            await this.getMarketHistory(coinStr, startDate, endDate, i)
        }
    }

    getMarketHistory(coinName, startDate, endDate, arrNum) {

        startDate = Math.floor(new Date(startDate).getTime() / 1000)
        endDate = Math.floor(new Date(endDate).getTime() / 1000)
        
        return fetch(`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart/range?vs_currency=usd&from=${startDate}&to=${endDate}`)
            .then(response => response.json())
            .then(response => this.saveMarketHistory(response, arrNum))
            .catch(err => console.error(err))
    }

    //Using this function to run inside of getMarketHistory function; which will store fetch responses in different data arrs
    saveMarketHistory(response, arrNum) { 
        let selectedDataType = document.getElementById("select-data-type").value
        let selectedData = response[selectedDataType]
        selectedData.forEach((el) => {
            let date = new Date(el[0]).toLocaleDateString("en-US")
            let dataArr = el[1]
            if(this.dateArr.length < selectedData.length){
                this.dateArr.push(date)
            }
            if(arrNum === 0) {
                this.coinOneData.push(dataArr)
            } else if(arrNum === 1) {
                this.coinTwoData.push(dataArr)
            } else {
                this.coinThreeData.push(dataArr)
            }
        })
    }

    //Function simply gets all our selector elements and saves the selected values into an array
    getSelectedVals(){
        const selectors = document.getElementsByClassName("selection")
        const selectedCoins = []
        for(const selector of selectors){
            selectedCoins.push(selector.value)
        }
        return selectedCoins
    }
    
    renderChart(){

        const canvasParent = document.getElementsByClassName("chart")[0] //Looks up the div where we're creating the canvas

        canvasParent.removeChild(canvasParent.lastElementChild) //Remove existing canvas so that we can render a new one with updated data

        const newCanvas = document.createElement("canvas") //Create a new canvas element

        //Set new Canvas paraments
        newCanvas.id = "main-chart"
        newCanvas.height = "300px"
        newCanvas.width = "700px"

        canvasParent.appendChild(newCanvas) //Appends the new canvase to the document


        const chart = new Charter(this.dateArr, this.coinOneData, this.coinTwoData, this.coinThreeData) //Creates new Chart instance with this constructor variables we set up
        
        //Renames the labels to match the coins data
        for(let i = 0; i < this.selectedCoins.length; i++){
            chart.dataSets.datasets[i].label = this.selectedCoins[i][0].toUpperCase() + this.selectedCoins[i].slice(1)
        }

        chart.renderChart() //Runs the render function from the Charter instance
    }
}