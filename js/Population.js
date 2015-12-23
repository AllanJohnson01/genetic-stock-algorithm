/**
 * Created by adjohnso on 12/9/2015.
 */
var Investor = require('./Investor');
var DNA = require('./DNA');
var stock = require('./Stock');

function Population(mutationRate, numOfInvestors) {
    this.numOfInvestors = numOfInvestors;
    var matingPool = [];
    var population = [];
    var generations = 0;
    var histWinners = [];
    for (var i = 0; i < numOfInvestors; i++) {
        var dna = new DNA;
        dna.firstDNA(i);
        population[i] = new Investor({dna: dna});
    }

    for (inv in population) {
        var rules = population[inv].getBuyRules();
        //noinspection JSDuplicatedDeclaration
        for (var i = 0; i < rules.length; i++) {
            //console.log("Investor " + inv + "'s buy rule # " + i + ": " + rules[i].pOff + rules[i].pTrade);
        }
    }
    this.checkDecisions = function () {
        var smaAvg = stock.weightedSMA(100);
        for (var i = 0; i <population.length; i++) {
            population[i].sellDecision(smaAvg);
            population[i].buyDecision(smaAvg);
            population[i].dayPerform();
        }
    };
    this.generationReport = function(g) {
        population.sort(function(a, b) {
            if (a.wealth() < b.wealth()) return 1;
            if (a.wealth() > b.wealth()) return -1;
            return 0;
        });
        for (inv in population) {
            population[inv].finishWealth = population[inv].wealth();
        }
        histWinners.push(population[0]);
        var buys = population[0].getBuyRules();
        var sells = population[0].getSellRules();
        /*for (var h = 0; h < 2; h++) {
            console.log("Gen " + g + " Change %                                    " + buys[h].pOff);
            console.log("Gen " + g + " Winning Investor's buy rule " + h + " %:    " + buys[h].pTrade);
            console.log("Gen " + g + " Winning Investor's sell rule " + h + "  %:  " + sells[h].pTrade);
        }*/
    };

    var sortPopulation = function () {
        population.sort(function(a, b) {
            if (a.avgFitness() < b.avgFitness()) return 1;
            if (a.avgFitness() > b.avgFitness()) return -1;
            return 0;
        });
        /*population.sort(function(a, b) {
            if (a.medianFitness() < b.medianFitness()) return 1;
            if (a.medianFitness() > b.medianFitness()) return -1;
            return 0;
        });*/
    };

    //////////////////////////////////
    this.selection = function () {
        matingPool.length = 0;
        sortPopulation();
        var  maxFitness = population[0].avgFitness(); //get max fitness
        for (var i = 0; i < population.length; i++) {
            //console.log("Wealth: " + population[i].wealth());
            //console.log("median: " + population[i].avgFitness());
            var fitness = population[i].avgFitness()/maxFitness;
            var fitnessNormal = Math.pow(Math.abs(fitness), 3); //Todo this may need adjusting.
            var n = fitnessNormal * 100;
            //console.log("n: " + n);
            if (population[i].finishWealth < population[i].getStartNetWorth()) { //Favor profitable investors
             n = n * 0.5; //todo this may need a little adjusting.
             }
            for (var j = 0; j < n; j++) {
                matingPool.push(population[i]);
            }
        }
        /*for (var inv in matingPool) {
            var buyR = matingPool[inv].getBuyRules();
            console.log("Invsetor's first buy rule count in pool: " + buyR[0].pTrade);
        }*/
    };

    this.reproduction = function() { //This repo function doesn't just mate, it keeps the best from the previous gen and copies of them that are slightly modified
        for (var i = 0; i < population.length * 2 / 3; i++) {

            if (i < 1) {
                var recordDNA = histWinners[0]
                population[i] =
            } else if (i < population.length/2) { //pick the top producing from previous generation. the investors should still be in order from the selection function
                var cloneDNA = population[i].getDNA();
                population[i] = new Investor({dna: cloneDNA});
                modCloneDNA1 = population[i].getDNA();
                modCloneDNA1.posAlter();
                population[i+1] = new Investor({dna: modCloneDNA1}); //Add a second investor with modified genes of the clone
                modCloneDNA2 = population[i].getDNA();
                modCloneDNA2.negAlter();
                population[i+2] = new Investor({dna: modCloneDNA2}); //Add a second investor with modified genes of the clone
                i+=2;
            } else {
                //Spin the wheel
                var m = Math.floor(Math.random() * matingPool.length);
                var d = Math.floor(Math.random() * matingPool.length);
                //Pick the parents
                var mom = matingPool[m];
                var dad = matingPool[d];
                //Get their DNA
                var momGenes = mom.getDNA();
                var dadGenes = dad.getDNA();
                //Mate the genes
                var child = momGenes.crossoverDNA(dadGenes);
                child.mutate(mutationRate);
                population[i] = new Investor({dna: child})
            }
        }
        //console.log("Investor 0's SharesOwned: " + population[0].sharesOwned);
        //console.log("Investor 0's cash: " + population[0].cash);
        //console.log("Investor 0's netWorth: " + population[0].wealth());
    };
    this.getWinners = function() {
        return histWinners;
    };
    this.getGenerations = function () {
        return generations;
    };
    this.getPopulation = function () {
        return population;
    }
}
module.exports = Population;