/**
 * Created by adjohnso on 12/9/2015.
 */
var Investor = require('./Investor');
var DNA = require('./DNA');

function Population(mutationRate, numOfInvestors) {
    this.numOfInvestors = numOfInvestors;
    var matingPool = [];
    var population = [];
    var generations = 0;
    for (var i = 0; i < numOfInvestors; i++) {
        var dna = new DNA;
        dna.firstDNA();
        population[i] = new Investor({dna: dna});
    }

    for (inv in population) {
        var rules = population[inv].getBuyRules();
        for (var i = 0; i < rules.length; i++) {
            //console.log("Investor " + inv + "'s buy rule # " + i + ": " + rules[i].pOff + rules[i].pTrade);
        }
    }
    this.checkDecisions = function () {
        for (var i = 0; i <population.length; i++) {
            population[i].sellDecision();
            population[i].buyDecision();
        }
    };
    this.generationReport = function(g) {
        population.sort(function(a, b) {
            if (a.wealth() < b.wealth()) return 1;
            if (a.wealth() > b.wealth()) return -1;
            return 0;
        });
        //for (var i = 0; i < population.length; i++) {
            console.log("Generation " + g + " Winning Investor's sharesOwned: " + population[0].sharesOwned);
        var buys = population[0].getBuyRules();
        var sells = population[0].getSellRules();
        for (var h = 0; h < buys.length; h++) {
            console.log("Generation " + g + " Winning Investor's buy chg %:   " + buys[h].pOff);
            console.log("Generation " + g + " Winning Investor's buy %:       " + buys[h].pTrade);
            console.log("Generation " + g + " Winning Investor's sell cng %:  " + sells[h].pOff);
            console.log("Generation " + g + " Winning Investor's sell %:      " + sells[h].pTrade);
        }
            console.log("Generation " + g + " Winning Investor's wealth:      " + population[0].wealth());
        //}
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
            for (var j = 0; j < n; j++) {
                matingPool.push(population[i]);
            }
        }
        for (var inv in matingPool) {
        }
    };

    this.reproduction = function() { //This repo function doesn't just mate, it keeps the best from the previous gen and copies of them that are slightly modified
        for (var i = 0; i < population.length; i++) {
            if (i < 1) {
                var testDNA = new DNA();
                testDNA.firstDNA();
                testDNA.genes[0].buyStockChangePer = 0.01;
                testDNA.genes[0].buyPerToTrade = 100;
                testDNA.genes[0].sellStockChangePer = 0.01;
                testDNA.genes[0].sellPerToTrade = 100;
                population[i] = new Investor({dna: testDNA});
            }else if (i < population.length/2) { //pick the top producing from previous generation. the investors should still be in order from the selection function
                var cloneDNA = population[i].getDNA();
                population[i] = new Investor({dna: cloneDNA});
                modCloneDNA = population[i].getDNA();
                for (var j = 0; j < modCloneDNA.genes.length; j++) {
                    var r = Math.random()*2;
                    if (r < 1) {r = -1} else { r = 1}
                    modCloneDNA.genes[j].buyStockChangePer += (Math.random()* 3) * r;
                    //console.log("buy gene: " + parentDNA.genes[j].buyPerToTrade);
                    r = Math.random()*2;
                    if (r < 1) {r = -1} else { r = 1}
                    modCloneDNA.genes[j].buyPerToTrade += (Math.random()* 3) * r;
                    r = Math.random()*2;
                    if (r < 1) {r = -1} else { r = 1}
                    modCloneDNA.genes[j].sellStockChangePer += (Math.random()* 3) * r;
                    r = Math.random()*2;
                    if (r < 1) {r = -1} else { r = 1}
                    modCloneDNA.genes[j].sellPerToTrade += (Math.random()* 3) * r;
                }
                population[i+1] = new Investor({dna: modCloneDNA}); //Add a second investor with modified genes of the clone
                i++;
            } else {
                //Spin the wheel
                var m = Math.floor(Math.random() * matingPool.length);
                var d = Math.floor(Math.random() * matingPool.length);
                //Pick the parents
                var mom = matingPool[m];
                var dad = matingPool[d];
                //Get their DNA
                var momGenes = mom.getDNA();
                //console.log("Mom buy rule: " + momGenes.genes[0].buyStockChangePer);
                //console.log("Mom sell rule: " + momGenes.genes[0].sellStockChangePer);
                var dadGenes = dad.getDNA();
                //console.log("Dad buy rule: " + dadGenes.genes[0].buyStockChangePer);
                //console.log("Dad sell rule: " + dadGenes.genes[0].sellStockChangePer);

                //Mate the genes
                var child = momGenes.crossoverDNA(dadGenes);
                //console.log("Child buy rule: " + child.genes[0].buyStockChangePer);
                //console.log("Child sell rule: " + child.genes[0].sellStockChangePer);
                //Mutate child genes
                child.mutate(mutationRate);
                population[i] = new Investor({dna: child})}


        }
    };

    this.getGenerations = function () {
        return generations;
    }
}
module.exports = Population;