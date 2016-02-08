/**
 * Created by adjohnso on 12/16/2015.
 */
import p5 from 'p5';
var popu, winners, numOfGenes;
var lookback = 5;
var recordW = 0;
var avgW = 0;
exports.setPop = function(pop) {
    popu = pop;
    winners = pop.getWinners();
    var n = winners[0].getBuyRules();
    numOfGenes = n.length;
    sortWinners();
    var wSum = 0;
    for (var i = winners.length; i > winners.length - lookback && i > 0; i--) {
        wSum += winners[i-1].wealth();
    }
    if (winners.length > lookback) {
        console.log("Average Winners Wealth: " + wSum / lookback);
    } else {
        console.log("Average Winners Wealth: " + wSum / winners.length);
    }
    popAvgW();
    calcRecordW();
};
var popAvgW = function () {
    var pop = popu.getPopulation();
    //var allWealth = [];
    var sum = 0;
    for (var inv = 0; inv < pop.length; inv++) {
        sum += pop[inv].wealth();
    }
    avgW = Math.round(sum/pop.length * 100)/100;
};

var sortWinners = function () {
    winners.sort(function(a, b) {
        if (a.wealth() > b.wealth()) return 1;
        if (a.wealth() < b.wealth()) return -1;
        return 0;
    });
};
var calcRecordW = function() {
    if (winners[winners.length -1].wealth() > recordW) {
        recordW = Math.round(winners[winners.length -1].wealth()*100)/100;
    }
};

function Histogram(p) {
    var colwidth = 0;
    p.setup = function() {
        p.createCanvas(1005, 150);
        p.noStroke();
    };
    p.draw = function() {
        p.background(245);

        colwidth = p.width/numOfGenes;
        p.textAlign(p.LEFT);
        p.fill(50, 200, 50);
        p.text("Buy Rules", 15, 30);
        p.fill(200, 15, 15);
        p.text("Sell Rules", 100, 30);
        p.textAlign(p.RIGHT);
        p.text("Record NetWorth: $" + recordW, p.width - 15, 20);
        p.text("Gen's Avg NetWorth: $" + avgW, p.width - 15, 40);

        for (var i = 0; i < numOfGenes; i++) {
            p.fill(50, 200, 50);
            p.rect(i * colwidth, p.height, colwidth/2, -buyAvg(i)*2);
            p.fill(200, 15, 15);
            p.rect(i * colwidth + colwidth/2 , p.height, colwidth/2, -sellAvg(i)*2);
        }
        p.line(0, p.height - 100, p.width, p.height - 100);
    };


    var buyAvg = function(ruleNum) {
        var sum = 0;
        //var wSum = 0;
        for (var i = winners.length; i > winners.length - lookback && i > 0; i--) {
            //wSum += winners[i].wealth()
            var r = winners[i-1].getBuyRules();
            sum += r[ruleNum].pTrade;
        }
        if (winners.length > lookback) {
            return sum / lookback
        } else {
            return sum / winners.length;
        }
    };
    var sellAvg = function(ruleNum) {
        var sum = 0;
        for (var i = winners.length; i > winners.length - lookback && i > 0; i--) {
            var r = winners[i-1].getSellRules();
            sum += r[ruleNum].pTrade;
        }
        if (winners.length > lookback) {
            return sum / lookback
        } else {
            return sum / winners.length;
        }
    };


}

exports = new p5(Histogram);