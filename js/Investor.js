/**
 * Created by adjohnso on 12/2/2015.
 */
var stock = require("./Stock");

function Investor(config) {
    var startNetWorth = 50000;
    this.dna = config.dna;
    this.sharesOwned = Math.floor((startNetWorth/2)/stock.neutralPrice);
    this.cash = startNetWorth - (this.sharesOwned * stock.price);
    this.wealth = function () {
        return this.cash + (this.sharesOwned * stock.price);
    };
    this.gain = function(wealth) {
        return (wealth - startNetWorth) / startNetWorth;
    };
    var sellRules = [];
    var buyRules = [];
    this.histPerform = [];
    this.dayPerform = function () {
        this.histPerform.push(this.wealth());
    };
    this.avgFitness = function() { //This func returns the avg daily gain for the investor  - 5% of the outliers on both ends
        var gains = [];
        var sum = 0;
        var testPeriod = 10;
        for (var i = testPeriod; i < this.histPerform.length; i++) {//take a period of time - calculate gain for that period
                if(this.histPerform[i] - this.histPerform[i - testPeriod] != 0) {
                    gains[i] = this.histPerform[i] - this.histPerform[i - testPeriod];
                }
        }
        gains.sort(function (a, b) {
            return a-b;
        }); //sort
        var half = Math.floor(gains.length/2);
        for (var i in gains) {
            if (i > gains.length * 0.05 && i < gains.length * 0.95) {
                sum += gains[i];
            }
        }
        var avg = sum / gains.length;
        var median = gains[half];
        //console.log("Median Gain: " + gains[half]);
        //console.log("Avg: " + avg);
        return median;//find the median gain
    };
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
        for (var i = 0; i < sellRules.length - 1; i++) {
            if (((stock.price - stock.neutralPrice)/stock.neutralPrice) > (sellRules[i].pOff/100) && ((stock.price - stock.neutralPrice)/stock.neutralPrice) <= (sellRules[i+1].pOff/100)) {
                this.sell(sellRules[i].pTrade);
            }
        }
    };

    this.buyDecision = function() {
        for (var i = 0; i < buyRules.length - 1; i++) {
            if (((stock.price - stock.neutralPrice)/stock.neutralPrice) < -(buyRules[i].pOff/100) && ((stock.price - stock.neutralPrice)/stock.neutralPrice) >= -(buyRules[i+1].pOff/100)) {
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