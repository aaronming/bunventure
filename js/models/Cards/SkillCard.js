export function SkillCard(sObj, id) {
    var self = this;
    
    self.id = id;
    self.myClass = sObj.Class || "General";
    self.level = parseInt(sObj.Level);
    self.cost = parseInt(sObj.Cost || sObj.AP) || 0;
    self.type = sObj.Type;
    self.name = sObj.Name;
    self.level = isNaN(parseInt(sObj.Level)) ? 1 : parseInt(sObj.Level);
    self.effect = sObj.Effect;
    self.price = parseInt(sObj.Price) || 0;
    self.activeTurn = ko.observable(1);

    function effectSplit() {
        var split = self.effect.split("; ")
        return split.join("\n");
    }

    self.skillImage = function() {
        var root = "img/skills/" + self.myClass;
        var skillName = self.name.replace(/\s/g, "-");
        var output = root + "/" + skillName + ".png";

        return output.toLowerCase();
    }

    self.description = ko.pureComputed(function() {
        var description = "Lv." + self.level + " " + self.name + 
            "\n" + self.type + " - " + self.cost + " AP" + 
            "\n----------------------" +
            "\n" + effectSplit();

        return description;
    });

    self.shopDescription = ko.pureComputed(function() {
        var description = self.name + " " + self.price + "g" +
            "\n" + self.type + " - " + self.cost + " AP" + 
            "\n----------------------" +
            "\n" + effectSplit();

        return description;
    });

    self.increaseActiveTurn = function() {
        var turn = self.activeTurn();
        self.activeTurn(turn++);
    }

    self.resetActiveTurn = function() {
        self.activeTurn(1);
    }
}