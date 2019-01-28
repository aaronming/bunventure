export function SkillCard(sObj, id) {
    var self = this;
    
    if (sObj) {
        self.myClass = sObj.Class || "General";
        self.level = parseInt(sObj.Level);
        self.cost = parseInt(sObj.Cost || sObj.AP) || 0;
        self.type = sObj.Type;
        self.name = sObj.Name;
        self.level = isNaN(parseInt(sObj.Level)) ? 1 : parseInt(sObj.Level);
        self.effect = sObj.Effect.split("; ").join("\n");
        self.price = parseInt(sObj.Price) || 0;
    }
    self.id = id;
    self.activeTurn = ko.observable(1);

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
            "\n" + self.effect;

        return description;
    });

    self.shopDescription = ko.pureComputed(function() {
        var description = self.name + " " + self.price + "g" +
            "\n" + self.type + " - " + self.cost + " AP" + 
            "\n----------------------" +
            "\n" +self.effect;

        return description;
    });

    self.activeTurnUpdate = function(change) {
        var turn = self.activeTurn() + change;
        self.activeTurn(turn);
    }

    self.mapping = function(otherCard) {
        self.myClass = otherCard.myClass;
        self.level = otherCard.level;
        self.cost = otherCard.cost;
        self.type = otherCard.type;
        self.name = otherCard.name;
        self.level = otherCard.level;
        self.effect = otherCard.effect.split("; ").join("\n");
        self.price = otherCard.price;
    }
}