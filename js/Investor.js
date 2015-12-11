/**
 * Created by adjohnso on 12/2/2015.
 */
var stock = require("./Stock");

function Investor(config) {
    var startNetWorth = 50000;
    //this.initInvestPercent = config.initInvestPercent | 50;
    this.dna = config.dna;
    this.cash = startNetWorth/2;
    this.sharesOwned = (startNetWorth/2)/stock.startPrice;
    this.wealth = function () {
        return this.cash + (this.sharesOwned * stock.price);
    }
    this.gain = function() {
        return (this.wealth - startNetWorth) / startNetWorth;
    }
    var sellRules = [];
    var buyRules = [];
    var buyRule = function(pOff, pTrade) {
        this.pOff = pOff;
        this.pTrade = pTrade;
    };

    var sellRule = function(pOff, pTrade) {
        this.pOff = pOff;
        this.pTrade = pTrade;
    };

    this.buy = function(perToTrade) {
        var subtractDollars = this.cash * (perToTrade / 100);
        var addShares = Math.floor(subtractDollars/stock.price);
        this.cash -= subtractDollars;
        this.sharesOwned += addShares;
    };

    this.sell = function(perToTrade) {
        var subtractShares = Math.ceil(this.sharesOwned * (perToTrade / 100));
        this.cash += subtractShares * stock.price;
        this.sharesOwned -= subtractShares;
    };
    for (var i = 0; i < this.dna.genes.length; i++) {
        buyRules.push(new buyRule(this.dna.genes[i].buyStockChangePer(), this.dna.genes[i].buyPerToTrade()));
        buyRules.push(new sellRule(this.dna.genes[i].sellStockChangePer(), this.dna.genes[i].sellPerToTrade()));
        console.log("from Investor push function: " + this.dna.genes[i].buyStockChangePer());
    }
    console.log('Attempt: ' + buyRules[0].pOff);
    /*this.addBuyRule = function(pOff, pToTrade) {
        buyRules.push(new buyRule(pOff, pToTrade));
    };*/

    /*this.addSellRule = function(pOff, pToTrade) {
        sellRules.push(new sellRule(pOff, pToTrade));
    };*/

    this.sellDecision = function() {
        for (var i = 0; i < sellRules.length; i++) {
            if (stock.price - stock.startPrice > sellRules[i].pOff) {
                this.sell(sellRules[i].pTrade);
            }
        }
    };

    this.buyDecision = function() {
        for (var i = 0; i < buyRules.length; i++) {
            if (stock.price - stock.startPrice > buyRules[i].pOff) {
                this.buy(buyRules[i].pTrade);
            }
        }
    };
    this.getBuyRules = function () {
        return buyRules;
    };
    this.getStartNetWorth = function() {
        return startNetWorth;
    };
    this.getDNA = function () {
        return dna;
    }
}
module.exports = Investor;