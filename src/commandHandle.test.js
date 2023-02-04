const handler = require('./commandHandle');


describe("non db handler", () => {

    test("on help call show on console helpText string", () => {
        console.log = jest.fn();
        handler.help();
        expect(console.log).toHaveBeenCalledWith(handler.helpTxt);
    })

    test("on unknownCommand call without mode show on console", () => {
        console.log = jest.fn();
        const str1 = "Enter is not a valid command. See 'help' list available commands.\n";
        handler.unknownCommand();
        expect(console.log).toHaveBeenCalledWith(str1);
    })

    test("on unknownCommand call with mode show on console", () => {
        console.log = jest.fn();
        const mode = "hello";
        const str2 = `'${mode}' is not a valid command. See 'help' list available commands.\n`;
        handler.unknownCommand(mode);
        expect(console.log).toHaveBeenCalledWith(str2);
    })

    test("on unableToProceed call without action show on console", () => {
        console.log = jest.fn();
        const str1 = `No manual entry. See 'help' list available commands.\n`;
        handler.unableToProceed();
        expect(console.log).toHaveBeenCalledWith(str1);
    })

    test("on unableToProceed call with action show on console", () => {
        console.log = jest.fn();
        const action = "hello";
        const str2 = `No manual entry${` for '${action}'`}. See 'help' list available commands.\n`;
        handler.unableToProceed(action);
        expect(console.log).toHaveBeenCalledWith(str2);
    })
})

describe("validate handler", () => {
    test("checkArray with incorrect data", () => {
        expect(handler.checkArray()).toBe(false);
        expect(handler.checkArray([], 1)).toBe(false);
        expect(handler.checkArray([undefined, "abc", 3], 2)).toBe(false);
    })
    test("checkArray with correct data", () => {
        expect(handler.checkArray([1, 2], 2)).toBe(true);
    })

    test("parseCommand with incorrect data", () => {
        expect(() => handler.parseCommand()).toThrow("DB, action and actionWordCount required");
        expect(handler.parseCommand(handler.initDbValue(), "login a", 3)).toBe(false);
        expect(handler.parseCommand(handler.initDbValue(), "login ", 2)).toBe(false);
    })
    test("parseCommand with correct data", () => {
        expect(handler.parseCommand(handler.initDbValue(), "login Alice", 2)).toEqual(["login", "Alice"]);
    })
})


describe("db handler", () => {
    let db = handler.initDbValue();
    const spy = jest.spyOn(handler, "unableToProceed");
    beforeEach(() => {
        db = handler.initDbValue();
        spy.mockClear();
    })

    describe("Login cases",()=>{    
        test("login with incorrect command",()=>{
            handler.login(db, "deposit Alice ac");
            handler.login(db, "login 100");
            handler.login(db, "transfer abc");
            handler.login(db, "login ");
            expect(spy).toHaveBeenCalledTimes(4)
        })
    
        test("withdraw with correct command",()=>{
            handler.login(db,"login Pinky")
            expect(spy).toHaveBeenCalledTimes(0)
            expect(db.currentUser).toEqual("Pinky");
        })
    })

    describe("Deposit cases",()=>{
        test("deposit without login",()=>{
            expect(()=>handler.deposit(db, "deposit 100")).toThrow("Customer not exits");
        })
    
        test("deposit with incorrect command",()=>{
            handler.deposit(db, "deposit Alice ac");
            handler.deposit(db, "login 100");
            handler.deposit(db, "deposit abc");
            handler.deposit(db, "deposit ");
            expect(spy).toHaveBeenCalledTimes(4)
        })
    
        test("deposit with command",()=>{
            handler.login(db,"login Pinky")
            handler.deposit(db, "deposit 100");
            expect(spy).toHaveBeenCalledTimes(0)
            expect(db.users["Pinky"]).toEqual(100);
        })
    })


    describe("withdraw cases",()=>{
        test("withdraw without login",()=>{
            expect(()=>handler.withdraw(db, "withdraw 100")).toThrow("Customer not exits");
        })
    
        test("withdraw with incorrect command",()=>{
            handler.withdraw(db, "deposit Alice ac");
            handler.withdraw(db, "login 100");
            handler.withdraw(db, "withdraw abc");
            handler.withdraw(db, "withdraw ");
            expect(spy).toHaveBeenCalledTimes(4)
        })
    
        test("withdraw with command",()=>{
            handler.login(db,"login Pinky")
            handler.deposit(db, "deposit 100");
            handler.withdraw(db, "withdraw 50");
            handler.withdraw(db, "withdraw 20");
            expect(spy).toHaveBeenCalledTimes(0)
            expect(db.users["Pinky"]).toEqual(30);
        })
    })

    describe("Logout cases",()=>{
        test("Logout without login",()=>{
            expect(()=>handler.logout(db, "logout")).toThrow("Customer not exits");
        })
    
        test("Logout with incorrect command",()=>{
            handler.logout(db, "deposit Alice ac");
            handler.logout(db, "login 100");
            handler.logout(db, "logout abc");
            expect(spy).toHaveBeenCalledTimes(3)
        })
    
        test("Logout with correct command",()=>{
            handler.login(db,"login Pinky")
            handler.deposit(db, "deposit 100");
            handler.logout(db, "logout");
            expect(spy).toHaveBeenCalledTimes(0)
            expect(db.currentUser).toBeNull();
        })
    })

    describe("transfer cases",()=>{
        test("transfer without login",()=>{
            expect(()=>handler.transfer(db, "transfer Bob 100")).toThrow("Customer not exits");
            handler.login(db,"login Alice");
            expect(()=>handler.transfer(db, "transfer Bob 100")).toThrow("Target Customer not exits");
        })
    
        test("transfer with incorrect command",()=>{
            handler.transfer(db, "deposit Alice ac");
            handler.transfer(db, "login 100");
            handler.transfer(db, "transfer abc");
            handler.transfer(db, "transfer 100 Bob");
            expect(spy).toHaveBeenCalledTimes(4)
        })
    
        test("transfer with correct command",()=>{
            handler.login(db,"login Sky")
            handler.deposit(db, "deposit 100");
            handler.logout(db,"logout");
            handler.login(db,"login Sum")
            handler.deposit(db, "deposit 50");
            handler.transfer(db, "transfer Sky 20");
            expect(spy).toHaveBeenCalledTimes(0);
            expect(db.users["Sky"]).toEqual(120);
            expect(db.users["Sum"]).toEqual(30);
        })
    })

})

