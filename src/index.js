// entry file for js
import {CoinInfo} from './scripts/coinInfo.js'
import {CoinChartData} from './scripts/coinChartData.js'
import {TrendingCoins} from './scripts/trendingCoins.js'


//Array used to set options for dropdown of coins to compare
const coinNames = [
    "bitcoin",
    "ethereum",
    "cardano",
    "solana",
    "polkadot",
    "dogecoin",
    "tron",
    "stellar",
    "algorand",
    "tether",
    "uniswap",
    "chainlink",
    "filecoin",
    "monero"
]

async function mainSetup() {

    const cardData = new CoinInfo()

    await cardData.getAllCoinsInfo("bitcoin")
    cardData.renderCardData("1")

    await cardData.getAllCoinsInfo("ethereum")
    cardData.renderCardData("2")

    await cardData.getAllCoinsInfo("solana")
    cardData.renderCardData("3")

    const trendingOne = new TrendingCoins()
    await trendingOne.getTrendingCoins()

    //--------- Start of selector build out ---------
    const selectors = document.getElementsByClassName("selector")

    for( const selector of selectors) {
        addSelector(selector)
    }

    function addSelector(listEl){
        const selector = document.createElement("select")
        selector.className = "selection"
        
        selector.onchange = async function(e) {

            //Re renders data widgets when new coin is selected
            const parentId = this.parentElement.id
            const selected = this.options[this.selectedIndex].value

            await cardData.getAllCoinsInfo(selected)

            if (parentId === "selector-one") {
                cardData.renderCardData("1")
            } else if (parentId === "selector-two") {
                cardData.renderCardData("2")
            } else {
                cardData.renderCardData("3")
            }

            //Re renders charts when new coin is selected
            reRenderChart()
            
        }

        //Creates options for the selectors based on hard-coded coin names array above
        for (const val of coinNames) {
            let option = document.createElement("option")
            option.value = val
            option.text = val.charAt(0).toUpperCase() + val.slice(1)
            selector.appendChild(option)
        }
    
        listEl.appendChild(selector)
    }
    //------ End of addSelector function ------

    

    //Manually setting default values for the selectors to match the renders
    document.getElementById("selector-one").firstChild.children[0].selected = "selected"
    document.getElementById("selector-two").firstChild.children[1].selected = "selected"
    document.getElementById("selector-three").firstChild.children[3].selected = "selected"
    
    reRenderChart()

    // Re renders chart when new dates are selected
    const datePicker = document.getElementsByName("daterange")[0]
    datePicker.onchange = reRenderChart
    

    const selectedDataType = document.getElementById("select-data-type")
    selectedDataType.onchange = reRenderChart

}
//--------- End of Main Setup function --------->

//--------- Helper function to reRender the charts --------->
const reRenderChart = async function() {
    const updatedChartResponse = new CoinChartData()
    await updatedChartResponse.updateCoinArrs()
    updatedChartResponse.renderChart()
}

// document.addEventListener("DOMContentLoaded", mainSetup)

document.addEventListener("DOMContentLoaded", () => {
    mainSetup()
})











