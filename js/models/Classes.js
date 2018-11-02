export function Classes(name, sData) {
    var self = this;

    self.className = name;
    self.attack = sData[0]["0"];
    self.defense = sData[1]["0"];
    self.hp = sData[2]["0"];
    self.ap = sData[3]["0"];
    self.hand = sData[4]["0"];
}

export function Stats(stats) {
    var self = this;

    self.className = stats["Class"];
    self.attack = stats["Attack"];
    self.defense = stats["Defense"];
    self.hp = stats["HP"];
    self.ap = stats["AP"];
    self.hand = stats["Hand"];
}