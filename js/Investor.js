/**
 * Created by adjohnso on 12/2/2015.
 */
var stock = require("./Stock");

function Investor(config) {
    var startNetWorth = 50000;
    this.dna = config.dna;
    this.sharesOwned = Math.floor((startNetWorth/2)/stock.startPrice);
    this.cash = startNetWorth - (this.sharesOwned * stock.price);
    this.wealth = function () {
        return this.cash + (this.sharesOwned * stock.price);
    };
    this.gain = function() {
        return (this.wealth - startNetWorth) / startNetWorth;
    };
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
        if (perToTrade <= 100) {
            var subtractDollars = this.cash * (perToTrade / 100);
            var addShares = Math.floor(subtractDollars / stock.price);
            this.cash -= subtractDollars;
            this.sharesOwned += addShares;
        }
    };

    this.sell = function(perToTrade) {
        if (perToTrade <= 100) {
            var subtractShares = Math.ceil(this.sharesOwned * (perToTrade / 100));
            this.cash += subtractShares * stock.price;
            this.sharesOwned -= subtractShares;
        }
    };
    for (var i = 0; i < this.dna.genes.length; i++) {
        buyRules.push(new buyRule(this.dna.genes[i].buyStockChangePer, this.dna.genes[i].buyPerToTrade));
        sellRules.push(new sellRule(this.dna.genes[i].sellStockChangePer, this.dna.genes[i].sellPerToTrade));
    }

    this.sellDecision = function() {
        for (var i = 0; i < sellRules.length; i++) {
            if (((stock.price - stock.startPrice)/stock.startPrice) > (sellRules[i].pOff/100)) {
                this.sell(sellRules[i].pTrade);
            }
        }
    };

    this.buyDecision = function() {
        for (var i = 0; i < buyRules.length; i++) {
            if (((stock.price - stock.startPrice)/stock.startPrice) < -(buyRules[i].pOff/100)) {
                this.buy(buyRules[i].pTrade);
            }
        }
    };
    this.getBuyRules = function () {
        return buyRules;
    };
    this.getSellRules = function () {
        return sellRules;
    };
    this.getStartNetWorth = function() {
        return startNetWorth;
    };
    this.getDNA = function () {
        return this.dna;
    }
}
module.exports = Investor;