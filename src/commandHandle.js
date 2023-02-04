
exports.helpTxt = `'login [name]' - Logs in to ATM \n'deposit [amount]' - Deposits money \n'withdraw [amount]' - Withdraws money \n'transfer [target] [amount]' - Transfers money to other customer \n'logout' - Logout from ATM \n'help' - See list available commands. \n`;


// login into Atm
exports.login = (db, action) => {
    // db required. if not throw intentional error on end to end test; 
    if(!db || !action) throw "DB and action required";
    const command = action.trim().split(" ");
    // action is not correct format
    if (command.length != 2 || (command.length === 2 && !command[1])) return exports.unableToProceed(action);
    // all data in correct format
    const [, userName] = command;
    if (!db.users[userName]) db.users[userName] = 0;
    this.currentUser = userName;
    console.log(`Hello, ${userName}!\nYour balance is ${db.users[userName]}$\n`);
}

exports.deposit = () => { }

exports.withdraw = () => { }

exports.transfer = () => { }

exports.logout = () => { }

exports.unknownCommand = (mode) => {
    console.log(`${mode ? `'${mode}'` : 'Enter'} is not a valid command. See 'help' list available commands.\n`)
}
exports.unableToProceed = (action) => {
    console.log(`No manual entry${action ? ` for '${action}'` : ''}. See 'help' list available commands.\n`)
}
exports.help = () => {
    console.log(exports.helpTxt)
}

exports.initDbValue = () => {
    return {
        users: {},
        currentUser: null
    }
}