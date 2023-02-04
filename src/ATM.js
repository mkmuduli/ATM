
const readline = require('readline');
const { help, unableToProceed, unknownCommand, login, initDbValue, deposit, withdraw, transfer, logout } = require('./commandHandle');

class ATM {
    constructor() {
        this.db = initDbValue();
    }
    welcome = () => {
        console.log("Welcome to the ATM Simulator! See 'help' list available command \n");
    }
    init = () => {
        // creating readline instance
        this.interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    ask = () => {
        return new Promise((resolve) => {
            // make interface ready accept command
            this.interface.question("$ ", resolve);
        })
    }
    askHandler = (action, isNotCallNext) => {
        const mode = action.trim().split(" ")[0];
        switch (mode) {
            case "login":
                console.log("aaaa")
                login(this.db, action);
                break;

            case "deposit":
                deposit(this.db, action);
                break;

            case "withdraw":
                withdraw(this.db, action);
                break;

            case "transfer":
                transfer(this.db, action);
                break;

            case "logout":
                logout(this.db, action);
                break;

            case "help":
                if (action.trim() === "help") help();
                else unableToProceed(action);
                break;

            default:
                unknownCommand(mode);
                break;
        }
        if (!isNotCallNext) this.ask().then(this.askHandler);
    }

}

module.exports = ATM;