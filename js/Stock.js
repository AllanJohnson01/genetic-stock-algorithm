/**
 * Created by adjohnso on 12/1/2015.
 */
function Stock(config)  {
    this.price  = config.price | 150;
    this.tradeDay = 0;
    this.apr = 10;
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
var stock = new Stock();
module.exports = stock;