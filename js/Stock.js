/**
 * Created by adjohnso on 12/1/2015.
 */

function Stock(config)  {

    this.startPrice = config.price | 150;
    this.price  = this.startPrice;
    this.neutralPrice = this.startPrice;
    this.tradeDay = 0;
    this.apr = 0; // Todo This changes the direction of the market, but I need to change the map() and the scaling of the window.
    this.volatility = 0.14; // This affects the smoothness of the noise() - smaller numbers = smoother changes
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