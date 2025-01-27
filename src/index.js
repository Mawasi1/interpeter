// src/index.js
const readline = require('readline');
const RuleManager = require('./RuleManager');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ruleManager = new RuleManager();

function promptUser() {
    rl.question('Enter command (rule/sensor/exit):\n', (commandType) => {
        if (commandType.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        if (commandType.toLowerCase() === 'rule') {
            rl.question('Enter rule: ', (ruleText) => {
                ruleManager.addRule(ruleText);
                promptUser();
            });
        }
        else if (commandType.toLowerCase() === 'sensor') {
            rl.question('Enter sensor input: ', (sensorInput) => {
                try {
                    ruleManager.handleSensorInput(parseSensorInput(sensorInput));
                } catch (error) {
                    console.log('Invalid sensor input format');
                }
                promptUser();
            });
        }
    });
}

function parseSensorInput(input) {
    if (input.startsWith('motion')) {
        return {
            type: 'motion',
            description: input
        };
    }
    if (input.startsWith('temp')) {
        const value = parseInt(input.match(/\d+/)[0]);
        return {
            type: 'temperature',
            value: value
        };
    }
    throw new Error('Invalid sensor input');
}

console.log('Command types: rule, sensor, exit');
console.log('Rule example: if motion in roomX and temp > 25 then light on');
console.log('Sensor input example: motion in roomX or temp = 26');
promptUser();