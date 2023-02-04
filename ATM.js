
const readline = require('readline');

class ATM {
    constructor() {
        this.db = {};
    }
    welcome() {
        console.log("Welcome to the ATM Simulator!\n");
    }
    init() {
        this.interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    ask() {
        return new Promise((resolve) => {
            this.interface.question("$ ", resolve);
        })
    }
    askHandler(action) {
        //    const mod = action.trim().split(" ")[0];

    }

}

module.exports = ATM;