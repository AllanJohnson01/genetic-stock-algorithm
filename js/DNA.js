/**
 * Created by adjohnso on 12/10/2015.
 */
function DNA() {
    this.genes = [];
    this.numOfGenes = 1;
    this.firstDNA = function() {
        for (var i = 0; i < this.numOfGenes; i++) {
            this.genes[i] = {
                buyStockChangePer: function () {
                    return Math.random() * 100;
                },
                buyPerToTrade: function () {
                    return Math.random() * 100;
                },
                sellStockChangePer: function () {
                    return Math.random() * 100;
                },
                sellPerToTrade: function () {
                    return Math.random() * 100;
                }
            };
            //this.genes.push(this.tradeRule);
        }
    };
    //this.newDNA = function(newGenes) {
    //    this.genes = newGenes;
    //};
    this.crossoverDNA = function(partner) {
        var childDNA = [];
        var xover = Math.ceil(Math.random()* this.numOfGenes);
        for (var i = 0; i < this.numOfGenes; i++) {
            if (i > xover) {
                childDNA[i] = this.genes[i];
            }
            else {
                childDNA[i] = partner.genes[i];
            }
        }
        var child = new DNA();
        child.genes = childDNA;
        return child;
    };
    this.mutate = function(m) {
        for (var i = 0; i < this.numOfGenes; i++) {
            var r = Math.random();
            if (r < m) {
                var mutatedGene = {
                    buyStockChangePer: function () {
                        return Math.random() * 100;
                    },
                    buyPerToTrade: function () {
                        return Math.random() * 100;
                    },
                    sellStockChangePer: function () {
                        return Math.random() * 100;
                    },
                    sellPerToTrade: function () {
                        return Math.random() * 100;
                    }
                };
                this.genes[i] = mutatedGene;
            }
        }
    };

}
module.exports = DNA;