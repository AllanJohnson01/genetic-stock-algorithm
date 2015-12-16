/**
 * Created by adjohnso on 12/10/2015.
 */
function DNA() {
    this.genes = [];
    this.numOfGenes = 4;
    this.firstDNA = function() {
        for (var i = 0; i < this.numOfGenes; i++) {
            this.genes[i] = {
                buyStockChangePer:  (Math.random() * 100),
                buyPerToTrade:      (Math.random() * 100),
                sellStockChangePer: (Math.random() * 100),
                sellPerToTrade:     (Math.random() * 100)
            };
        }
    };

    this.crossoverDNA = function(partner) {
        var childGenes = [];
        var xover = Math.round(Math.random()* this.numOfGenes);
        for (var i = 0; i < this.numOfGenes; i++) {
            if (i < xover) {childGenes[i] = this.genes[i];}
            else {childGenes[i] = partner.genes[i];}
        }
        var child = new DNA();
        child.genes = childGenes;
        return child;
    };
    this.mutate = function(m) {
        for (var i = 0; i < this.numOfGenes; i++) {
            var r = Math.random();
            if (r < m) {
                this.genes[i] = {
                    buyStockChangePer: (Math.random() * 100),
                    buyPerToTrade: (Math.random() * 100),
                    sellStockChangePer: (Math.random() * 100),
                    sellPerToTrade: (Math.random() * 100)
                };
            }
        }
    };

}
module.exports = DNA;