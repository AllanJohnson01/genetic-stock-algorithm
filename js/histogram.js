/**
 * Created by adjohnso on 12/16/2015.
 */
require("p5");
var pop, winners, numOfGenes;

exports.setPop = function(pop) {
    pop = pop;
    winners = pop.getWinners();
    var n = winners[0].getBuyRules();
    numOfGenes = n.length;
    sortWinners();
};

var sortWinners = function () {
    winners.sort(function(a, b) {
        if (a.wealth() > b.wealth()) return 1;
        if (a.wealth() < b.wealth()) return -1;
        return 0;
    });
};

function Histogram(p) {
    var lookback = 10;
    var buyAvgs = [];
    var sellAvgs = [];

    p.setup = function() {
        p.createCanvas(420, 300);
    };
    p.draw = function() {
        p.background(245);
        p.stroke(200);

        for (var i = 0; i < numOfGenes; i++) {
            p.fill(220, 200, 90);
            p.rect(i * 4, p.height/2, 4, -buyAvg(i));
            p.fill(100, 200, 250);
            p.rect(i * 4, p.height, 4, -sellAvg(i));
        }
    };


    var buyAvg = function(ruleNum) {
        var sum = 0;
        for (var i = winners.length - 1; i > winners.length - lookback && i >= 0; i--) {
            var r = winners[i].getBuyRules();
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
        for (var i = winners.length - 1; i > winners.length - lookback && i >= 0; i--) {
            var r = winners[i].getSellRules();
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