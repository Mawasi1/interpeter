// src/Action.js
class Action {
    constructor(description) {
        this.description = description;
        this.device = this.extractDevice(description);
        this.command = this.extractCommand(description);
    }

    extractDevice(description) {
        const devices = ["light", "ac", "fan", "heater", "pump"];
        for (const device of devices) {
            if (description.toLowerCase().includes(device)) {
                return device;
            }
        }
        return null;
    }

    extractCommand(description) {
        if (description.toLowerCase().includes("on")) return "on";
        if (description.toLowerCase().includes("off")) return "off";
        return null;
    }

    execute() {
        console.log(`Executing: ${this.device} ${this.command}`);
    }
}

module.exports = Action;