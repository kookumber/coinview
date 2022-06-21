// entry file for js
import {CoinInfo} from './scripts/coinInfo.js'
import {CoinChartData} from './scripts/coinChartData.js'
import {Charter} from './scripts/overviewChart.js'



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
    "apecoin",
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

    const selectors = document.getElementsByClassName("selector")

    for( const selector of selectors) {
        addSelector(selector)
    }

    function addSelector(listEl){
        const selector = document.createElement("select")

        selector.onchange = async function(e) {
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

            //Add code to re-run graphing

            const updatedChartResponse = new CoinChartData()
            await updatedChartResponse.updateCoinArrs()
            updatedChartResponse.renderChart()
            
        }

        selector.className = "selected-coin"

        for (const val of coinNames) {
            let option = document.createElement("option")
            option.value = val
            option.text = val.charAt(0).toUpperCase() + val.slice(1)
            selector.appendChild(option)
        }
    
        listEl.appendChild(selector)
    }

    // manually setting default values for the selectors to match the renders
    document.getElementById("selector-one").firstChild.children[0].selected = "selected"
    document.getElementById("selector-two").firstChild.children[1].selected = "selected"
    document.getElementById("selector-three").firstChild.children[3].selected = "selected"
    
    const chartResponse = new CoinChartData()
    await chartResponse.updateCoinArrs()
    chartResponse.renderChart()

    
}

function updateDataCard() {

}

// document.addEventListener("DOMContentLoaded", mainSetup)

document.addEventListener("DOMContentLoaded", () => {
    mainSetup()
})











