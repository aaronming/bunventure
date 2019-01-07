export function Classes(name, sData, book) {
    var self = this;

    self.className = name;
    self.attack = sData[0]["0"];
    self.defense = sData[1]["0"];
    self.hp = sData[2]["0"];
    self.ap = sData[3]["0"];
    self.hand = sData[4]["0"];
    self.skillBook = book;
    self.classImage = "img/class/" + name.toLowerCase() + ".png";
}

export function Stats(stats) {
    var self = this;

    self.className = stats["Class"];
    self.attack = parseInt(stats["Attack"]);
    self.defense = parseInt(stats["Defense"]);
    self.hp = parseInt(stats["HP"]);
    self.ap = parseInt(stats["AP"]);
    self.hand = parseInt(stats["Hand"]);
}