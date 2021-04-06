/* eslint-disable no-undef */
const poonya = require("../src/poonya")
    , assert = require("assert");

describe("poonya-objects-test", () => {
    describe("#script-execution-test[eval#3]-object-constructions", () => {
        it("Object constructs#1", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    set var1 = 'hello';
                    set var2 = 'world';

                    Object ->
                        from -> 'somemail@example.com',
                        to -> 'somesomemail@example.com',
                        message -> 'It says ' var1 ' ' var2;
                `), 
                {
                    from: 'somemail@example.com',
                    to: 'somesomemail@example.com',
                    message: 'It says hello world'
                }
            );
        });

        it("Object constructs#2", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    set var1 = 'hello';
                    set var2 = 'world';

                    Object ->
                        from -> 'somemail@example.com',
                        to -> 'somesomemail@example.com',
                        message -> Join.concat <- {
                            > 'It says ';
                            > var1; 
                            > ' ';
                            > var2;
                        };
                `), 
                {
                    from: 'somemail@example.com',
                    to: 'somesomemail@example.com',
                    message: 'It says hello world'
                }
            );
        });
    })
});