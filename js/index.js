/**
 * Created by adjohnso on 12/1/2015.
 */
import Settings from './react/settings.jsx';
console.log(Settings);
import p5 from 'p5';
var stock = require('./Stock');
var histo = require('./histogram');


var stockGraph = function(p) {
    var fRate = 60;
    var testLength = 250;
//*** New Price Function Declarations***//
    var time = Math.random()* 100;
    var marketTime = Math.random()* 10;
    var marketFluct = 0.02;
    var invMarketRng = 5; // make this a high number to flatten the market.
    var minY = 0;
    var maxY;
    var mapY = 0;
    var Population = require('./Population');
    var pop;
    var generation = 1;
    var numOfInvestors = 250;
    var mutationRate = 0.02;
    //var gen = [];
    var run = true;
    var SMAs = [];
    p.setup = function () {
        p.createCanvas(1065, 300);
        p.background(246);
        maxY = p.height;
        mapY = maxY;
        SMAs.push(new SMA(p.height/2, stock, 10, "red"));
        SMAs.push(new SMA(p.height/2, stock, 25, "LightGreen"));
        SMAs.push(new SMA(p.height/2,stock, 50, "lime"));
        SMAs.push(new SMA(p.height/2,stock, 100, "Green"));
        SMAs.push(new SMA(p.height/2,stock, 100, "DarkGreen"));
        pop = new Population(mutationRate, numOfInvestors);
    };

    p.draw = function () {
        stock.priceHistory.push(stock.price);
        p.frameRate(fRate);
        stock.price = priceChange();
        drawStockChart(stock.price);
        for (var s = 0; s < SMAs.length; s++) SMAs[s].draw();
        pop.checkDecisions();
        stock.tradeDay++;
        /////////////////////////////////////// End of Generation
        if (stock.tradeDay % testLength == 0) {
            pop.generationReport(generation);
            histo.setPop(pop);
            pop.selection();
            pop.reproduction();
            generation++;
        }
    };
    p.mouseClicked = function() {
        if (run) {
            run = false;
            p.noLoop();
        } else {
            run = true;
            p.loop();
        }
    };
/////////////////////////////////
    var priceChange = function() { /*Todo. This function needs 2 adjustments.
                                     1. change the map to keep the percentage of gain/loss proportionate to the current price of the stock.
                                     2. adjust the scaling of the window to match item #1.*/
        var market = marketChg();
        var n = p.map(p.noise(time),0,1,-1,1);
        var n2 = p.pow(Math.abs(n), 2.5);
        if (n < 0) n2 *= -1;
        var n3 = p.map(n2, -1.5, 1.5, 0, mapY);
        var newPrice = n3 - (p.height/2 - stock.priceHistory[0]);
        var finalPrice = newPrice + market;
        // Moving forward in time
        var dailyPerRate = stock.apr/250;
        stock.neutralPrice += dailyPerRate;
        minY += dailyPerRate;
        maxY += dailyPerRate;
        mapY += dailyPerRate * 2;
        time += stock.volatility;
        //console.log("newPrice: " + newPrice);
        return finalPrice;
    };
    var marketChg = function() {
        var n = p.map(p.noise(marketTime), 0.5 - invMarketRng,0.5 + invMarketRng, 0, p.height);
        n -= stock.startPrice;
        marketTime += marketFluct;
        return n;
    };
    /////////////////////////////////
    var SMA = function(lastPoint, stock, periods, color) {
        this.lastPoint = lastPoint;
        //this.stock = stock;
        this.periods = periods;
        this.color = color;
    };
    SMA.prototype.draw = function() {
        p.push();
        p.translate(0, maxY);
        var drawingArea = p.width -65;
        var repeat = stock.tradeDay % drawingArea;
        p.stroke(this.color);
        p.strokeWeight(0.5);
        var newSMA = stock.SMA(this.periods);
        p.line(repeat -1, -this.lastPoint, repeat, -newSMA);
        this.lastPoint = newSMA;
        p.pop();
    };

//////////////////////////////////
    var drawStockChart = function(yPrice) {
        var drawingArea = p.width -65;
        var repeat = stock.tradeDay % drawingArea;
        p.noStroke();
        p.fill(248);
        p.rect(0,0, 200, 50);
        p.fill(0);
        p.text("Generation: " + generation, 15, 30);
        p.push();
        p.translate(0,maxY);
        p.noStroke();
        p.fill(255, 255, 255,15);
        p.rect((stock.tradeDay+50)%(drawingArea), -minY, -50, -maxY);
        p.rect(repeat, -minY, 50, -maxY);
        p.stroke(0, 0, 0);
        p.strokeWeight(0.5);
        p.point(repeat, -yPrice);
        if (stock.tradeDay % 250 == 0) {
            p.stroke(0);
            p.line(repeat, -minY, repeat, -maxY);
        }
        var drawTickMarks = function () {
            p.fill(50, 250, 100);
            p.noStroke();
            p.rect(p.width - 60, -minY, p.width , -maxY);
            for (var i = -p.height/2; i <= maxY; i++) {
                if (i% 50 == 0) {
                    p.fill(0);
                    p.stroke(0);
                    p.line(p.width - 60, -i, p.width - 40, -i);
                    p.textAlign(p.LEFT, p.CENTER);
                    p.text(i, p.width -30, -i);
                }
            }
        };
        drawTickMarks();
        p.pop();
    };
};
new p5(stockGraph);
require('./histogram');



