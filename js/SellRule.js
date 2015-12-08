/**
 * Created by allanjohnson on 12/5/15.
 */
var stock = require('./Stock');
var investor = require('./Investor');

var SellRule = function(pOff, pTrade) {
    if (stock.price - stock.startPrice > pOff) {
        investor.sell(pTrade);
    }
};

module.exports = SellRule;