/**
 * Created by adjohnso on 12/1/2015.
 */
var stock = require('./Stock');
var fRate = 500;
var marketAPR = 0.05;
var volatility = 0.10;
var testLength = 2400;
//*** New Price Function Declarations***//
var time = Math.random()* 100;
var minY = 0;
var maxY;

var stockGraph = function(p) {
    p.setup = function () {
        p.createCanvas(800, 400);
        p.background(220);
        maxY = p.height;
    };

    p.draw = function () {
        stock.priceHistory.push(stock.price);
        p.frameRate(fRate);
        stock.price += stock.price * priceChange();
        //console.log(stock.price);
        drawStockChart(stock.price);
        stock.tradeDay++;
        if (stock.tradeDay >= testLength) {
            p.noLoop();
        }
    };
    p.mouseClicked = function() {
        p.noLoop();
    };

    var priceChange = function() {
        var n = p.map(p.noise(time),0,1,-1,1);
        var n2 = p.pow(n, 3);
        var n3 = p.map(n2, -1, 1, minY + 2, maxY + 2);

        var percentChange = ((n3 - minY)-(maxY - minY)/2)/10;

        // Move forward in time
        minY += marketAPR;
        maxY += marketAPR;
        time += volatility;
        console.log("percentChange: " + percentChange);
        return percentChange/100;
    };
    var drawTickMarks = function () {
        p.fill(50, 250, 100);
        p.noStroke();
        p.rect(p.width - 60, -minY, p.width , -maxY);
        for (var i = -p.height/2; i <= maxY; i++) {
            if (i% 50 == 0) {
                p.fill(0);
                p.stroke(0);
                p.line(p.width, -i, p.width - 20, -i);
                p.textAlign(p.RIGHT);
                p.text(i, p.width -30, -i);
            }
        }
    };

    var drawStockChart = function(yPrice) {
        var drawingArea = p.width -65;
        var repeat = stock.tradeDay % drawingArea;
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
        drawTickMarks();
        p.pop();
    };
};
module.exports = stockGraph;
