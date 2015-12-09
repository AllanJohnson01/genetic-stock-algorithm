/**
 * Created by adjohnso on 12/1/2015.
 */
var stock = require('./Stock');
var fRate = 500;
var testLength = 2510;
//*** New Price Function Declarations***//
var time = Math.random()* 100;
var minY = 0;
var maxY;
var Investor = require('./Investor');
var investors = [];

var stockGraph = function(p) {
    p.setup = function () {
        p.createCanvas(800, 300);
        p.background(220);
        maxY = p.height;
        for (var i = 0; i < 20; i++) {
            investors[i] = new Investor();
            for (var j = 0; j < 5; j++) {
                investors[i].addBuyRule(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
                investors[i].addSellRule(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
            }
        }
        for (inv in investors) {
            var rules = investors[inv].getBuyRules();
            for (var i = 0; i < rules.length; i++) {
                console.log("Investor " + inv + "'s buy rule # " + i + ": " + rules[i].pOff + rules[i].pTrade);
            }
        }

    };

    p.draw = function () {
        stock.priceHistory.push(stock.price);
        p.frameRate(fRate);
        stock.price = priceChange();
        drawStockChart(stock.price);
        for (var i = 0; i <investors.length; i++) {
            investors[i].sellDecision();
            investors[i].buyDecision();
        }
        for (var i = 0; i < investors.length; i++) {
            console.log("sharesOwned: " + investors[i].sharesOwned);
            console.log("Cash: " + investors[i].sharesOwned);
        }
        stock.tradeDay++;
        if (stock.tradeDay >= testLength) {
            p.noLoop();
        }
    };
    p.mouseClicked = function() {
        p.noLoop();
    };
/////////////////////////////////
    var priceChange = function() {
        var n = p.map(p.noise(time),0,1,-1,1);
        var n2 = p.pow(Math.abs(n), 3.9);
        if (n < 0) n2 *= -1;
        var n3 = p.map(n2, -1, 1, minY, maxY);
        var newPrice = n3 - (p.height/2 - stock.priceHistory[0]);
        // Moving forward in time
        var dailyPerRate = stock.apr/250;
        minY += dailyPerRate;
        maxY += dailyPerRate;
        time += stock.volatility;
        console.log("newPrice: " + newPrice);
        return newPrice;
    };

//////////////////////////////////
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
module.exports = stockGraph;
