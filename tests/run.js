/* eslint-disable no-undef */
const poonya = require("../src/poonya")
    , assert = require("assert");

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

    describe("#script-execution-test[eval#2]-object-constructions", () => {
        it("Basic object construction", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    Object ->
                        6 -> 2 + 2 * 2,
                        8 -> 2 + 2 + 2 * 2,
                        12 -> 4 * 3,
                        64 -> 8 * 8,
                        128 -> 4 * 32;
                `), 
                {
                    '12': 12,
                    '128': 128,
                    '6': 6,
                    '64': 64
                }
            );
        });

        it("Deep object construction", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    Object ->
                        type -> 'house',
                        flat -> 1,
                        floor -> 1,
                        pasport ->
                            0 -->
                                type ---> 'citizen',
                                name ---> 'nick',
                                sex ---> 'male',
                                age ---> 19,
                            1 -->
                                type ---> 'citizen',
                                name ---> 'joe',
                                sex ---> 'male',
                                age ---> 22,
                            2 -->
                                type ---> 'citizen',
                                name ---> 'clara',
                                sex ---> 'female',
                                age ---> 24;
                `),
                {
                    'flat': 1,
                    'floor': 1,
                    'pasport': {
                        '0': {
                            'age': 19,
                            'name': 'nick',
                            'sex': 'male',
                            'type': 'citizen'
                        },
                        '1': {
                            'age': 22,
                            'name': 'joe',
                            'sex': 'male',
                            'type': 'citizen'
                        },
                        '2': {
                            'age': 24,
                            'name': 'clara',
                            'sex': 'female',
                            'type': 'citizen'
                        }
                    },
                    'type': 'house'
                }
            );
        });

        it("Literal object contruction #1", async () => {
            const context = await poonya.createContext();

            // 
            // Вот тут плохой пример, вы по сути создаете сначала литеральный конструктор строки скобками, а потом передаете его в фактический конструктор
            // 
            assert.strictEqual(
                await context.eval(`
                    String -> "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
                `),
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            );
        });

        it("Literal object contruction #2", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    Array -> "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
                `),
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.".split('')
            );
        });

        it("Literal object contruction #3", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    Array ->
                        0 -> 0,
                        1 -> 1,
                        2 -> 2,
                        3 -> 3;
                `),
                [0, 1, 2, 3]
            );
        });
    });

    describe("#script-execution-test[eval#2]-group-output", () => {
        it("Base group output", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    {
                        > 0;
                        > 1;
                        > 2;
                        > 3;
                    }
                `),
                [0, 1, 2, 3]
            );
        });


        it("Base group output with concat joiner", async () => {
            const context = await poonya.createContext();

            assert.strictEqual(
                await context.eval(`
                    Join.concat <- {
                        > 0;
                        > 1;
                        > 2;
                        > 3;
                    }
                `),
                '0123'
            );
        });

        it("Double group output with concat joiner", async () => {
            const context = await poonya.createContext();

            assert.strictEqual(
                await context.eval(`
                    Join.concat <- {
                        > Join.concat <- {
                            > 'h';
                            > 'e';
                            > 'l';
                            > 'l';
                            > 'o';
                        };
                        
                        > ' ';

                        > Join.concat <- {
                            > 'w';
                            > 'o';
                            > 'r';
                            > 'l';
                            > 'd';
                        };
                    }
                `),
                'hello world'
            );
        });

        it("Triple group output with concat joiner", async () => {
            const context = await poonya.createContext();

            assert.strictEqual(
                await context.eval(`
                    Join.concat <- {
                        > Join.concat <- {
                            > 'h';
                            > 'e';
                            > 'l';
                            > 'l';
                            > 'o';
                        };
                        
                        > ' ';

                        > Join.concat <- {
                            > 'w';
                            > 'o';
                            > 'r';
                            > 'l';
                            > 'd';

                            > ' ';

                            > Join.concat <- {
                                > 'l';
                                > 'a';
                                > 'm';
                                > 'e';
                                > 'r';
                            }
                        };
                    }
                `),
                'hello world lamer'
            );
        });

        it("Double group output with raw joiner", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    Join.raw <- {
                        > Join.raw <- {
                            > 'h';
                            > 'e';
                            > 'l';
                            > 'l';
                            > 'o';
                        };
                        
                        > ' ';

                        > Join.raw <- {
                            > 'w';
                            > 'o';
                            > 'r';
                            > 'l';
                            > 'd';
                        };
                    }
                `),
                [['h', 'e', 'l', 'l', 'o'], ' ', ['w', 'o', 'r', 'l', 'd']]
            );
        });
    })
});