/**
 * Created by adjohnso on 12/1/2015.
 */

function Stock(config)  {

    this.startPrice = config.price | 150;
    this.price  = this.startPrice;
    this.neutralPrice = this.startPrice;
    this.tradeDay = 10;
    this.apr = 0; // Todo This changes the direction of the market, but I need to change the map() and the scaling of the window.
    this.volatility = 0.16; // This affects the smoothness of the noise() - smaller numbers = smoother changes
    this.priceHistory = [this.price];
    this.SMA = function(periods) {
        var sum = 0;
        for (var i = this.priceHistory.length; i > this.priceHistory.length - periods; i--) {
            sum += this.priceHistory[i -1];
        }
        return sum / periods;
    }
}
module.exports = new Stock({startPrice: 150});