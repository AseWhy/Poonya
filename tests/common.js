/* eslint-disable no-undef */
const poonya = require("../src/poonya")
    , assert = require("assert")
    , { CannotImportStaticLibrary } = require("../src/classes/exceptions");

describe("poonya-common-test", () => {
    describe("#scope", () => {
        it("Should return SomeValue-1 and SomeValue", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-scope-1",
            });

            assert.notStrictEqual(await pattern.result().complete(), [
                "SomeValue-1",
                "SomeValue",
            ]);
        });

        it("Should return SomeValue and null", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-scope-2",
            });

            assert.notStrictEqual(await pattern.result().complete(), ["SomeValue", null]);
        });

        it("Should return an array with numbers", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-scope-3",
            });

            assert.notStrictEqual(await pattern.result().complete(), [
                5,
                10,
                30,
                120,
                600,
                3600,
                25200,
                201600,
                1814400,
                18144000,
                199584000,
            ]);
        });
    });

    describe("#object-notation", () => {
        it("Should return two empty objects", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-literal-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                Field1: 'value1',
                Field2: [
                    1,
                    2,
                    3,
                    4
                ],
                Field3: 0
            }]);
        });

        it("Should return one filled object", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-literal-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                field1: 1,
                field2: 2,
                field3: 3,
                field4: 4,
                field5: {
                    field1: 1,
                    field2: 2,
                    field3: {
                        field1: 1,
                        field2: 2
                    }
                },
                field6: 6
            }]);
        });

        it("Should return indexed object", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-literal-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                "0": 0,
                "1": 1,
                "2": 2,
                "3": 3,
                "4": 4,
                "5": 5,
                "6": 6,
                "7": 7,
                "8": 8,
                "9": 9
            }]);
        });
    });

    describe("#object-field-edit", () => {
        it("Should return one field with string which equals 'NOT 1'", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-edit-field-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                field1: "NOT 1"
            }]);
        });

        it("Should return filed, with 2 subfield which equals 'NOT 1' and 'NOT 2'", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-edit-field-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                field1: {
                    subfield1: "NOT 1",
                    subfield2: "NOT 2"
                }
            }]);
        });

        it("Should return 'NOT OBJECT' contains string field", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-edit-field-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{
                field1: 'NOT OBJECT'
            }]);
        });
    });

    describe("#object-inheritance", () => {
        it("Checking the inheritance of fields from an object", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-inheritance-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                true,
                {
                    field1: 1,
                    SomeField: 1
                }
            ]);
        });

        it("Should return an array with numbers from 0 to 5", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-inheritance-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                [1, 2, 3, 4, 5]
            ]);
        });

        it("Should return empty array", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-inheritance-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [[]]);
        });
    });

    describe("#object-static-methods", () => {
        it("Should return an array with values ​​from 0 to 5", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-static-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                [0, 1, 2, 3, 4, 5]
            ]);
        });

        it("Should return an empty array", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-static-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [[]]);
        });

        it("Should return an empty object", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/unit-object-static-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [{}]);
        });
    });

    describe("#script-execution-test[eval]", () => {
        it("Context test for execution of a string with an expression.", async () => {
            const context = await poonya.createContext()
                , out = new poonya.PoonyaOutputStream();

            context.eval(`
                > 2 + 2 * 2; // Basic mathematics
            `, out);

            // eval will never raise an end event, so the complete function is useless.
            out.once('data', data => assert.strictEqual(data, 6));
        });

        it("Test for reuse context and execute string.", async () => {
            const context = await poonya.createContext()
                , out = new poonya.PoonyaOutputStream();

            // Starting script execution in context
            await context.eval(`
                set s = 5;

                > 2 + 2 * s; // Basic mathematics

                s = 4;
            `, out);

            // Сontinue to execute the script in the given context
            await context.eval(`
                > 2 + 2 * s;
            `, out);

            assert.deepStrictEqual(out._data, [12, 10]);
        });

        it("Test for the return value when the eval script finishes executing.", async () => {
            const context = await poonya.createContext();

            assert.strictEqual(await context.eval(`2 + 2 * 2`), 6);
        });
    });

    describe("#output-group-test", () => {
        it("Should return array of strings", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/output-group-test-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                ['it', ' ', 'says', ' ', 'hello', ' ', 'world']
            ]);
        });

        it("Should return 'it says hello world'", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/output-group-test-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                'it says hello world'
            ]);
        });

        it("Should return sequence of numbers", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/output-group-test-2",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                '012345678910'
            ]);
        });
    });

    describe("#use-statement-test", () => {
        it("use-statement-test#0-html-lorem-ipsum", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/use-statement-test-0",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                '<div><h3>Hello world!</h3><p>Ex quis in reprehenderit excepteur ut proident nisi. Consectetur tempor proident est consequat excepteur eu. Adipisicing fugiat aute incididunt ad amet ea. Adipisicing duis reprehenderit pariatur ullamco consectetur tempor elit est cillum. Eu non reprehenderit enim magna eu et reprehenderit ex.</p><p>Culpa qui officia velit labore nisi ullamco fugiat excepteur incididunt ea magna enim cillum. Proident consectetur ad tempor laboris enim deserunt occaecat ullamco ex amet. Nostrud amet ut commodo mollit velit ut nulla pariatur reprehenderit dolor dolor ipsum.</p></div>'
            ]);
        });

        it("use-statement-test#1-dynamic-use", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/use-statement-test-1",
            });

            assert.deepStrictEqual(await pattern.result().complete(), [
                'It working!)'
            ]);
        });

        it("use-statement-test#2-import-fail", async () => {
            const pattern = new poonya.ExecutionPattern({
                path: "./src/use-statement-test-2",
            });

            try {
                await pattern.result().complete();
                assert.fail();
            } catch(e) {
                assert.ok(e instanceof CannotImportStaticLibrary);
            }
        });
    });
});