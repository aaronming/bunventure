export function ActivityCard(obj) {
    var self = this;
    
    self.isActivityCard = true;
    self.name = obj.Name;
    self.type = obj.Type;
    self.effect = obj.Effect;
}