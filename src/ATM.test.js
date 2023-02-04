const ATM = require("./ATM");
const readline = require('readline');
const handler = require('./commandHandle');
jest.mock('./commandHandle');
jest.mock('readline');


describe("ATM", () => {
    let citi = new ATM();

    beforeEach(() => {
        citi = new ATM();
    });

    test("After init call RI should be initialized", () => {
        readline.createInterface.mockReturnValue({})
        citi.init();
        expect(citi.interface).toBeTruthy();
    });

    test("ask should send data on resolve which sent by user", () => {
        readline.createInterface.mockReturnValue({ question: (str, cb) => cb("hi")});
        citi.init();
        return citi.ask().then((action) => {
            expect(action).toEqual("hi");
        })
    })


});

describe("askHandler use case",()=>{
    test("askHandler call right function", () => {

        citi.askHandler("login Alice", true);
        expect(handler.login).toHaveBeenCalledTimes(1);

        citi.askHandler("deposit 100", true);
        expect(handler.deposit).toHaveBeenCalled();


        citi.askHandler("withdraw 10", true);
        expect(handler.withdraw).toHaveBeenCalled();

        citi.askHandler("logout", true);
        expect(handler.logout).toHaveBeenCalled();

        citi.askHandler("transfer Alice 100", true);
        expect(handler.transfer).toHaveBeenCalled()

        citi.askHandler("sell 100", true);
        expect(handler.unknownCommand).toHaveBeenCalled()

        citi.askHandler("help 123", true);
        expect(handler.unableToProceed).toHaveBeenCalled()
        jest.clearAllMocks();
    })
})