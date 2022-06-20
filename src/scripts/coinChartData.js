export class CoinChartData{

    constructor(){
        this.coinOneData = []
        this.coinTwoData = []
        this.coinThreeData = []
        this.dateArr = []
    }   


    getMarketHistory(coinName, startDate, endDate) {

        startDate = Math.floor(new Date(startDate).getTime() / 1000)
        endDate = Math.floor(new Date(endDate).getTime() / 1000)

        return fetch(`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart/range?vs_currency=usd&from=${startDate}&to=${endDate}`)
            .then(response => response.json())
            .then(response => this.saveDateLabel(response))
            .catch(err => console.error(err))
    }

    saveDateLabel(response) {
        let market_caps = response.market_caps
        market_caps.forEach((el) => {
            let date = new Date(el[0]).toLocaleDateString("en-US")
            this.dateArr.push(date)
        })
    }

    logSelectedVals(){
        const selectors = document.getElementsByClassName("selected-coin")
        console.log(selectors)
    }
}