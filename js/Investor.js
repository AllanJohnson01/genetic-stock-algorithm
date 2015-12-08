/**
 * Created by adjohnso on 12/2/2015.
 */
var stock = require("./Stock");

function Investor(config) {
    var startNetWorth = 50000;
    this.initInvestPercent = config.initInvestPercent;
    this.cash = startNetWorth/2;
    this.sharesOwned = (startNetWorth/2)/stock.startPrice;
    this.wealth = this.cash + (this.sharesOwned * stock.price);
    this.gain = (this.wealth - startNetWorth) / startNetWorth;
    var sellRules = [];
    var buyRules = [];
    var buyRule = function(pOff, pTrade) {
        if (stock.price - stock.startPrice > pOff) {
            this.buy(pTrade);
        }
    };

    var sellRule = function(pOff, pTrade) {
        if (stock.price - stock.startPrice > pOff) {
            this.sell(pTrade);
        }
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

    };

    this.buyDecision = function() {

    };




}

module.exports = Investor;