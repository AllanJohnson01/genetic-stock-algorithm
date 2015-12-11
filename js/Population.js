/**
 * Created by adjohnso on 12/9/2015.
 */
var Investor = require('./Investor');
var DNA = require('./DNA');

function Population(mutationRate, numOfInvestors) {
    this.mutationRate = mutationRate;
    this.numOfInvestors = numOfInvestors;
    var matingPool = [];
    var population = [];
    var generations = 0;
    for (var i = 0; i < numOfInvestors; i++) {
        var dna = new DNA;
        //dna.DNA();
        population[i] = new Investor({dna: dna});
        console.log("test: " + population[i].dna.genes[0].buyStockChangePer());
        /*for (var j = 0; j < dna.numOfGenes; j++) {
            population[i].addBuyRule(population[i].dna.tradeRule.stockChangePer, population[i].dna.tradeRule.perToTrade);
            population[i].addSellRule(population[i].dna.tradeRule.stockChangePer, population[i].dna.tradeRule.perToTrade);
            //population[i].addSellRule(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
        }*/
    }

    for (inv in population) {
        var rules = population[inv].getBuyRules();
        for (var i = 0; i < rules.length; i++) {
            console.log("Investor " + inv + "'s buy rule # " + i + ": " + rules[i].pOff + rules[i].pTrade);
        }
    }
    this.checkDecisions = function () {
        for (var i = 0; i <population.length; i++) {
            population[i].sellDecision();
            population[i].buyDecision();
            //console.log("sharesOwned: " + population[i].sharesOwned);
            //console.log("Cash: " + population[i].cash);
            //console.log("Investor " + i + "'s wealth: " + population[i].wealth())
        }
    };
    this.generationReport = function() {
        for (var i = 0; i < population.length; i++) {
            console.log("Investor " + i + "'s sharesOwned: " + population[i].sharesOwned);
            console.log("Investor " + i + "'s Cash: " + population[i].cash);
            console.log("Investor " + i + "'s wealth: " + population[i].wealth())
        }
        this.selection();
    };

    var sortPopulation = function () {
        population.sort(function(a, b) {
            if (a.wealth() < b.wealth()) return 1;
            if (a.wealth() > b.wealth()) return -1;
            return 0;
        });
    };

    //////////////////////////////////
    this.selection = function () {
        sortPopulation();
        var maxFitness = population[0].wealth(); //get max fitness
        for (var i = 0; i < population.length; i++) {
            var fitness = population[i].wealth()/maxFitness;
            var fitnessNormal = Math.pow(fitness, 7); //Todo this may need adjusting.
            var n = fitnessNormal * 100;
            if (population[i].wealth() < population[i].getStartNetWorth()) { //Favor profitable investors
                n = n * 0.7; //todo this may need a little adjusting.
            }
            console.log("n: " + n);
            for (var j = 0; j < n; j++) {
                matingPool.push(population[i]);
            }
        }
        console.log("mating pool length: " + matingPool.length);
        for (var inv in matingPool) {
            console.log(matingPool[inv].wealth());
        }
    };

    this.reproduction = function() {
        for (var i = 0; i < population.length; i++) {
            //Spin the wheel
            var m = Math.round(Math.random() * matingPool.length);
            var d = Math.round(Math.random() * matingPool.length);
            //Pick the parents
            var mom = matingPool[m];
            var dad = matingPool[d];
            //Get their DNA
            var momGenes = mom.getDNA();
            var dadGenes = dad.getDNA();
            //Mate the genes
            var child = momGenes.crossover(dadGenes);
            //Mutate child genes
            child.mutate(mutationRate);
            population[i] = new Investor(child)
        }
    };

    this.getGenerations = function () {
        return generations;
    }
}
module.exports = Population;