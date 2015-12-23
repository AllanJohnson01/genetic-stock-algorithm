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
    this.SMA = function(periods) {
        var sum = 0;
        for (var i = this.priceHistory.length; i > this.priceHistory.length - periods; i--) {
            sum += this.priceHistory[i -1];
        }
        return sum / periods;
    }
    this.weightedSMA = function(length) {
        var sum = 0;
        var num = 0;
        if (length > this.tradeDay) length = this.tradeDay;
        for (var i = 1; i <= length; i *= 2) {
            sum += this.SMA(i);
            num++;
        }
        return sum/num;
    }
}
module.exports = new Stock({startPrice: 150});