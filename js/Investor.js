/**
 * Created by adjohnso on 12/2/2015.
 */
var stock = require("./Stock");

function Investor() {
    var startNetWorth = 50000;
    //this.initInvestPercent = config.initInvestPercent | 50;
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

    this.addBuyRule = function(pOff, pToTrade) {
        buyRules.push(new buyRule(pOff, pToTrade));
    };

    this.addSellRule = function(pOff, pToTrade) {
        sellRules.push(new sellRule(pOff, pToTrade));
    };

    this.sellDecision = function() {
        for (rule in sellRules) {
            if (stock.price - stock.startPrice > this.pOff) {
                this.sell(this.pTrade);
            }
        }
    };

    this.buyDecision = function() {
        for (rule in buyRules) {
            if (stock.price - stock.startPrice > this.pOff) {
                this.buy(this.pTrade);
            }
        }
    };
    this.getBuyRules = function () {
        return buyRules;
    }



}

module.exports = Investor;