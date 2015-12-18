/**
 * Created by adjohnso on 12/16/2015.
 */
require("p5");
var pop, winners, numOfGenes;
var lookback = 5;
exports.setPop = function(pop) {
    pop = pop;
    winners = pop.getWinners();
    var n = winners[0].getBuyRules();
    numOfGenes = n.length;
    sortWinners();
    for (win in winners) {
        console.log("wealth " + winners[win].wealth());
    }
        var wSum = 0;
        for (var i = winners.length; i > winners.length - lookback && i > 0; i--) {
            wSum += winners[i-1].wealth();
        }
        if (winners.length > lookback) {
            console.log("Average Winners Wealth: " + wSum / lookback);
        } else {
            console.log("Average Winners Wealth: " + wSum / winners.length);
        }
};

var sortWinners = function () {
    winners.sort(function(a, b) {
        if (a.wealth() > b.wealth()) return 1;
        if (a.wealth() < b.wealth()) return -1;
        return 0;
    });
};

function Histogram(p) {

    var buyAvgs = [];
    var sellAvgs = [];
    var colwidth = 0;
    p.setup = function() {
        p.createCanvas(420, 300);
    };
    p.draw = function() {
        p.background(245);
        p.stroke(200);
        colwidth = p.width/numOfGenes;
        p.text("Buy Rules", 15, 30);
        p.text("Sell Rules", 15, p.height/2 + 30);

        for (var i = 0; i < numOfGenes; i++) {
            p.fill(220, 200, 90);
            p.rect(i * colwidth, p.height/2, colwidth, -buyAvg(i));
            p.fill(100, 200, 250);
            p.rect(i * colwidth, p.height, colwidth, -sellAvg(i));
        }

        p.line(0, p.height - 100, p.width, p.height - 100);
        p.line(0, p.height/2 - 100, p.width, p.height/2 - 100);
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