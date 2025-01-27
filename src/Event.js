// src/Event.js
class Event {
    constructor(description) {
        this.description = description;
        this.type = this.extractType(description);
        this.value = this.extractValue(description);
        this.operator = this.extractOperator(description);
        this.triggers = [];
    }

    extractType(description) {
        if (description.includes('temp')) return 'temperature';
        if (description.includes('motion')) return 'motion';
        return null;
    }

    extractValue(description) {
        const match = description.match(/\d+/);
        return match ? parseInt(match[0]) : null;
    }

    extractOperator(description) {
        if (description.includes('>')) return '>';
        if (description.includes('<')) return '<';
        if (description.includes('=')) return '=';
        return null;
    }

    addTrigger(action) {
        this.triggers.push(action);
    }

    matches(input) {
        if (this.type === 'temperature' && input.type === 'temperature') {
            switch(this.operator) {
                case '>': return input.value > this.value;
                case '<': return input.value < this.value;
                case '=': return input.value === this.value;
            }
        }
        if (this.type === 'motion' && input.type === 'motion') {
            return this.description === input.description;
        }
        return false;
    }
}

module.exports = Event;