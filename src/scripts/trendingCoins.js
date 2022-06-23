export class TrendingCoins {

    getTrendingCoins(){
        return fetch("https://api.coingecko.com/api/v3/search/trending")
            .then(response => response.json())
            .then(response => {
                this.renderTrendingCoins(response)
            })
            .catch(err => console.error(err))
    }

    renderTrendingCoins(response){
        const trendingCoinsCard = document.getElementById('trending-coins').lastElementChild

        const coinsArr = response.coins

        coinsArr.forEach((hash) => {
            let dataRow = document.createElement("li")

            let dataDivOne = document.createElement("div")
            let logoImg = document.createElement("img")
            logoImg.src = hash.item.small
            dataDivOne.appendChild(logoImg)

            let dataDivTwo = document.createElement("div")
            let coinName = document.createElement("h4")
            coinName.innerText = hash.item.name
            let coinRank = document.createElement("p")
            coinRank.innerText = "Market Cap Rank: " + hash.item.market_cap_rank

            dataDivTwo.appendChild(coinName)
            dataDivTwo.appendChild(coinRank)

            dataRow.appendChild(dataDivOne)
            dataRow.appendChild(dataDivTwo)

            trendingCoinsCard.appendChild(dataRow)
        })
    }

}