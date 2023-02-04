
exports.helpTxt = `'login [name]' - Logs in to ATM \n'deposit [amount]' - Deposits money \n'withdraw [amount]' - Withdraws money \n'transfer [target] [amount]' - Transfers money to other customer \n'logout' - Logout from ATM \n'help' - See list available commands. \n`;


exports.checkArray = (arr, count) => {
    // not a valid param
    if (!Array.isArray(arr) || count === undefined) return false;
    let isValid = true;
    let i = 0;
    while (i <= count - 1) {
        if (!arr[i]) isValid = false;
        i++;
    }
    return isValid;
}

exports.parseCommand = (db, action, actionWordCount) => {
    // db required. if not throw intentional error on end to end test; 
    if (!db || !action || !actionWordCount) throw "DB, action and actionWordCount required";
    const command = action.trim().split(" ");
    // action is not correct format
    if (command.length != actionWordCount || !exports.checkArray(command, actionWordCount)) {
        return false;
    }
    return command;
}

// login into Atm
exports.login = (db, action) => {
    const command = exports.parseCommand(db, action, 2);
    if (!command) return exports.unableToProceed(action);
    const [mode, userName] = command;
    if (mode !== "login" || parseInt(userName, 10)) return exports.unableToProceed(action);
    // all data in correct format
    if (!db.users[userName]) db.users[userName] = 0;
    db.currentUser = userName;
    console.log(`Hello, ${userName}!\nYour balance is $${db.users[userName]}\n`);
}

exports.deposit = (db, action) => {
    const command = exports.parseCommand(db, action, 2);
    if (!command) return exports.unableToProceed(action);
    const [mode, amount] = command;
    if (mode !== "deposit" || !parseInt(amount, 10)) return exports.unableToProceed(action);
    const userName = db.currentUser;
    // if user not exits
    if (db.users[userName] == undefined) throw "Customer not exits";
    db.users[userName] += parseInt(amount, 10);
    console.log(`Your balance is $${db.users[userName]}\n`);
}

exports.withdraw = (db, action) => {
    const command = exports.parseCommand(db, action, 2);
    if (!command) return exports.unableToProceed(action);
    const [mode, amount] = command;
    if (mode !== "withdraw" || !parseInt(amount, 10)) return exports.unableToProceed(action);
    const userName = db.currentUser;
    // if user not exits
    if (db.users[userName] == undefined) throw "Customer not exits";

    db.users[userName] -= parseInt(amount, 10);
    console.log(`Your balance is $${db.users[userName]}\n`);
}

exports.transfer = (db, action) => {
    const command = exports.parseCommand(db, action, 3);
    if (!command) return exports.unableToProceed(action);
    const [mode, target, amount] = command;
    if (mode !== "transfer" || parseInt(target, 10) || !parseInt(amount, 10)) return exports.unableToProceed(action);
    const userName = db.currentUser;
    // if user not exits
    if (db.users[userName] == undefined) throw "Customer not exits";
    if (db.users[target] == undefined) throw "Target Customer not exits";

    db.users[userName] -= parseInt(amount, 10);
    db.users[target] += parseInt(amount, 10);

    console.log(`Transferred ${amount} to ${target} \nyour balance is $${db.users[userName]}`)
}

exports.logout = (db, action) => {
    const command = exports.parseCommand(db, action, 1);
    if (!command) return exports.unableToProceed(action);
    if (command[0] !== "logout") return exports.unableToProceed(action);
    const userName = db.currentUser;
    // if user not exits
    if (db.users[userName] == undefined) throw "Customer not exits";
    db.currentUser = null;
    console.log(`Goodbye, ${userName}!`)
}

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