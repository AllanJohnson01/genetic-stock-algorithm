/**
 * Created by adjohnso on 12/10/2015.
 */
function DNA() {
    this.genes = [];
    this.numOfGenes = 100;
    this.firstDNA = function(mult) {
        for (var i = 0; i < this.numOfGenes; i++) {
            this.genes[i] = {
                buyStockChangePer:  i/4,
                buyPerToTrade:      mult,//(Math.random() * 100),
                sellStockChangePer: i/4,
                sellPerToTrade:     mult //(Math.random() * 100)
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
            this.genes[j].buyPerToTrade += 1;
            this.genes[j].sellPerToTrade += -1;
        }
    };
    this.negAlter = function () {
        //var r1 Math.random()*2;
        //r2 = Math.random()*2;
        for (var j = 0; j < this.genes.length; j++) {
            this.genes[j].buyPerToTrade += -1;
            this.genes[j].sellPerToTrade += 1;
        }
    };
    this.mutate = function(m) {
        for (var i = 0; i < this.numOfGenes; i++) {
            var r = Math.random();
            if (r < m) {
                this.genes[i] = {
                    buyStockChangePer:  i/4,
                    buyPerToTrade:      this.genes[i].buyPerToTrade += ((Math.random() * 10) -5),
                    sellStockChangePer: i/4,
                    sellPerToTrade:     this.genes[i].sellPerToTrade += ((Math.random() * 10) -5)
                };
            }
        }
    };

}
module.exports = DNA;