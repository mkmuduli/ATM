const ATM = require("./ATM");
const readline = require('readline');

describe("ATM", () => {
    let citi = new ATM();

    afterEach(() => {
        citi = new ATM();
    });

    test("After init call RI should be initialised", () => {
        citi.init();
        expect(citi.interface).toBeTruthy();
    });

    test("ask should send data on resolve which sent by user", () => {
        jest.spyOn(readline,'createInterface').mockReturnValue({question:(str,cb)=> cb("hi") })
        citi.init();
        return citi.ask().then((action) => {
            expect(action).toEqual("hi");
        })
    })
});