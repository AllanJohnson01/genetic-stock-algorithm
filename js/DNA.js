/**
 * Created by adjohnso on 12/10/2015.
 */
function DNA() {
    this.genes = [];
    this.numOfGenes = 5;
    //this.DNA = function() {
        for (var i = 0; i < this.numOfGenes; i++) {
            this.genes[i] = {
                buyStockChangePer: function () {
                    return Math.random() * 10;
                },
                buyPerToTrade: function () {
                    return Math.random() * 10;
                },
                sellStockChangePer: function () {
                    return Math.random() * 10;
                },
                sellPerToTrade: function () {
                    return Math.random() * 10;
                }
            };
            //this.genes.push(this.tradeRule);
        }
    //};
    this.newDNA = function(newGenes) {
        this.genes = newGenes;
    };
    this.crossover = function(partner) {
        console.log('in crossover');
        var child = [];
        var xover = Math.ceil(Math.random()* numOfGenes);
        for (var i = 0; i < numOfGenes; i++) {
            if (i > xover) child[i] = genes[i];
            else           child[i] = partner.genes[i];
        }
        newGenes = new newDNA(child);
        return newGenes;
    };
    this.mutate = function(m) {
        console.log('in mutate');
        for (var i = 0; i < numOfGenes; i++) {
            if (Math.random()* numOfGenes < m) {
                var mutatedGene = {
                    stockChangePer: this.stockChangePer = Math.floor(Math.random() * 10),
                    perToTrade: this.perToTrade = Math.floor(Math.random() * 10)
                };
                genes[i] = mutatedGene;
            }
        }
    };

}
module.exports = DNA;