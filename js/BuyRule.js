/**
 * Created by allanjohnson on 12/5/15.
 */
var stock = require('./Stock');
var investor = require('./Investor');

var BuyRule = function(pOff, pTrade) {
    if (stock.price - stock.startPrice > pOff) {
        investor.buy(pTrade);
    }
};
module.exports = BuyRule;