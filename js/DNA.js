/**
 * Created by adjohnso on 12/10/2015.
 */
function DNA() {
    this.genes = [];
    this.numOfGenes = 100;
    this.firstDNA = function() {
        for (var i = 0; i < this.numOfGenes; i++) {
            this.genes[i] = {
                buyStockChangePer:  i/4,
                buyPercentToTrade:      (Math.random() * 100),
                sellStockChangePer: i/4,
                sellPercentToTrade:     (Math.random() * 100)
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
    this.posAlter = function () {
        //var r1 Math.random()*2;
        //r2 = Math.random()*2;
        for (var j = 0; j < this.genes.length; j++) {
            this.genes[j].buyPercentToTrade += Math.random();
            this.genes[j].sellPercentToTrade += -Math.random();
        }
    };
    this.negAlter = function () {
        //var r1 Math.random()*2;
        //r2 = Math.random()*2;
        for (var j = 0; j < this.genes.length; j++) {
            this.genes[j].buyPercentToTrade += -Math.random();
            this.genes[j].sellPercentToTrade += Math.random();
        }
    };
    /*this.smRandAlter = function () {
        for (var j = 0; j < this.genes.length; j++) {
            var r1  = Math.random()*2;
            var r2 = Math.random()*2;
            this.genes[j].buyPercentToTrade += -1;
            this.genes[j].sellPercentToTrade += 1;
        }
        for (var j = 0; j < this.genes.length; j++) {
            var r1  =Math.random()*2;
            var r2 = Math.random()*2;
            this.genes[j].buyPercentToTrade += -1;
            this.genes[j].sellPercentToTrade += 1;
        }
    };*/

    this.mutate = function(m) {
        for (var i = 0; i < this.numOfGenes; i++) {
            var r = Math.random();
            if (r < m) {
                this.genes[i] = {
                    buyStockChangePer:  i/4,
                    buyPercentToTrade:      (Math.random() * 100),
                    sellStockChangePer: i/4,
                    sellPercentToTrade:     (Math.random() * 100)
                };
            }
        }
    };

}
module.exports = DNA;