/**
 * Created by adjohnso on 12/1/2015.
 */

function Stock(config)  {

    this.startPrice = config.price | 150;
    this.price  = this.startPrice;
    this.tradeDay = 0;
    this.apr = 0;
    this.volatility = 0.3;
    this.priceHistory = [this.price];
    var i = 0;
    var updateHistory = function() {
        if (this.tradeDay != i) {
            this.priceHistory.push(this.price);
            i++;
        }
    }
}
module.exports = new Stock({startPrice: 150});