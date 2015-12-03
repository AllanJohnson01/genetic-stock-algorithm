/**
 * Created by adjohnso on 12/2/2015.
 */
var stock = require("./Stock");

function Investor(config) {
    var startNetWorth = 50000;
    this.initInvestPercent = config.initInvestPercent;
    this.cash = config.cash;
    this.sharesOwned = config.sharesOwned;
    this.wealth = this.cash + (this.sharesOwned * stock.price);
    this.gain = (this.wealth - startNetWorth) / startNetWorth;
};