// CoinInfo grabs from CoinGeckos coins/markets page

export class CoinInfo {
 
    constructor(){
        this.coinData = {}
        this.name = ""
        // this.getAllCoinsInfo = getAllCoinsInfo()
    }

    logoHash = {
        "bitcoin": "1",
        "ethereum": "1027",
        "cardano": "2010",
        "solana": "5426",
        "polkadot": "6636",
        "dogecoin": "74",
        "tron": "1958",
        "stellar" : "512",
        "algorand": "4030",
        "apecoin": "18876",
        "tether": "825",
        "uniswap": "7083",
        "chainlink": "1975",
        "filecoin": "2280",
        "monero": "328"
    }

    getAllCoinsInfo(coinName) {
        this.name = coinName
        
        return fetch(`https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
            .then(response => response.json())
            .then(response => {
                this.filteredData(response)
            })
            .catch(err => console.error(err));
    }

    filteredData(response){
        
        this.coinData["Current Price"] = this.formatter.format(response.market_data.current_price.usd)
        this.coinData["Ticker"] = response.symbol.toUpperCase()
        this.coinData["Market Cap"] = this.formatter.format(response.market_data.market_cap.usd)
        this.coinData["Market Cap Rank"] = response.market_cap_rank
        this.coinData["All Time High"] = this.formatter.format(response.market_data.ath.usd)
        this.coinData["% Change 24H"] = Number(response.market_data.price_change_percentage_24h_in_currency.usd / 100).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})
        // this.coinData["Circulating Supply"] = response.circulating_supply
    }

    renderCardData(cardId){
        
        let widget = document.getElementById(cardId) // Gets the widget element

        widget.removeChild(widget.firstChild) //Removes existing card title text

        let titleDiv = document.createElement("div")
        titleDiv.className = "logo-title-div"
        let titleText = document.createElement("p")
        titleText.innerText = (this.name)[0].toUpperCase() + this.name.slice(1)

        let textNode = document.createTextNode(
            (this.name)[0].toUpperCase() + this.name.slice(1))
        
        let coinLogo = document.createElement("img")

        titleDiv.append(coinLogo)
        titleDiv.append(titleText)

        console.log(titleDiv)
        coinLogo.setAttribute("src", `https://s2.coinmarketcap.com/static/img/coins/64x64/${this.logoHash[this.name]}.png`)
        // widget.prepend(textNode) //Resets the title with the coin name
        // widget.prepend(coinLogo)
        widget.prepend(titleDiv)
        const card = widget.lastElementChild //Gets the ul element of the data widget class

        let cardLi = card.lastElementChild

        //while loop below ensures we're deleting any old li elements before replacing the data
        while(cardLi) {
            card.removeChild(cardLi)
            cardLi = card.lastElementChild
        }

        for(const key in this.coinData){
            let dataRow = document.createElement("li")
            
            let dataKey = document.createElement("div")
            dataKey.innerHTML = key
            
            let dataValue = document.createElement("div")
            dataValue.innerHTML = this.coinData[key]

            dataRow.appendChild(dataKey)
            dataRow.appendChild(dataValue)

            card.appendChild(dataRow)
        }

    }

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    
    });
}