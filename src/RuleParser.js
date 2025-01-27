// src/RuleParser.js
const Event = require('./Event');
const Action = require('./Action');

class RuleParser {
    parseRule(ruleText) {
        const withoutIf = ruleText.replace('if ', '');
        const [conditions, actions] = withoutIf.split(' then ');
        
        const eventDescriptions = conditions.split(' and ');
        const events = eventDescriptions.map(desc => new Event(desc.trim()));
        
        const actionsList = actions.split(' and ').map(desc => new Action(desc.trim()));
        
        return {
            events,
            actions: actionsList
        };
    }
}

module.exports = RuleParser;