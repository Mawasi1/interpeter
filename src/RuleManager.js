// src/RuleManager.js
const RuleParser = require('./RuleParser');

class RuleManager {
    constructor() {
        this.rules = [];  // Will store complete rules with their states
    }

    addRule(ruleText) {
        const parser = new RuleParser();
        const {events, actions} = parser.parseRule(ruleText);
        
        // Create a rule object that tracks its conditions
        const rule = {
            events: events,
            actions: actions,
            eventStates: events.map(event => ({
                event: event,
                isMet: false,
                lastValue: null
            }))
        };

        this.rules.push(rule);
        console.log('\nRule added successfully!');
    }

    handleSensorInput(input) {
        console.log(`\nReceived sensor input: ${JSON.stringify(input)}`);
        
        // Check each rule
        this.rules.forEach(rule => {
            // Update the state of any matching events in this rule
            rule.eventStates.forEach(eventState => {
                if (eventState.event.matches(input)) {
                    eventState.isMet = true;
                    eventState.lastValue = input;
                    console.log(`Event condition met: ${eventState.event.description}`);
                }
            });

            // Check if all conditions in this rule are met
            const allConditionsMet = rule.eventStates.every(state => state.isMet);

            if (allConditionsMet) {
                console.log('All conditions met! Executing actions:');
                rule.actions.forEach(action => {
                    console.log(`Executing action: ${action.description}`);
                    action.execute();
                });
                
                // Reset conditions after executing actions
                rule.eventStates.forEach(state => {
                    state.isMet = false;
                });
            }
        });
    }
}

module.exports = RuleManager;