class Interpreter {
    constructor() {
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
    }

    handleInput(input) {
        console.log(`Received input: ${input}`);
        for (const event of this.events) {
            if (event.matches(input)) {
                console.log(`Found matching event: ${event.description}`);
                event.triggers.forEach(action => action.execute());
            }
        }
    }
}

module.exports = Interpreter;