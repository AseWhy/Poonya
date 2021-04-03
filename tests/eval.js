/* eslint-disable no-undef */
const poonya = require("../src/poonya")
    , assert = require("assert");

describe('poonya-eval-test', () => {
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
                    '64': 64,
                    '8': 8
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
    });

    describe("#script-execution-test[eval#2]-break-and-continue-statements", () => {
        it("Double repeat break", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    {
                        repeat(0; 100) {
                            repeat(0; current 1) {
                                if(current > 10) {
                                    > current ' - 1';
                        
                                    break;
                                }
                            }
                        
                            if(current > 10) {
                                > current;
                        
                                break;
                            }
                        }
                        
                        > 'result';
                    }
                `),
                [
                    '11 - 1',
                    11,
                    'result'
                ]
            );
        });

        it("While break", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    {
                        set s = 5;

                        while(true) {
                            if(s > 100) {
                                > 'Foo!' s;

                                break;
                            }

                            s = s + 1;
                        }
                    }
                `),
                [
                    'Foo!101'
                ]
            );
        });

        it("While continue", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    {
                        set s = 0;

                        while(true) {
                            s = s + 1;
                            
                            if(s < 10 & s >= 0) {
                                if(s = 1) {
                                    > 'Foo!' s;
                                }
            
                                continue;
                            }
            
                            if(s < 20 & s >= 10) {
                                if(s = 11) {
                                    > 'Foo!' s;
                                }
            
                                continue;
                            }
            
                            if(s < 30 & s >= 20) {
                                if(s = 21) {
                                    > 'Foo!' s;
                                }
            
                                continue;
                            }
            
                            if(s < 40 & s >= 30) {
                                if(s = 31) {
                                    > 'Foo!' s;
                                }
            
                                continue;
                            }
            
                            if(s < 50 & s >= 40) {
                                if(s = 41) {
                                    > 'Foo!' s;
                                }
            
                                continue;
                            }
            
                            if(s < 60 & s >= 50) {
                                if(s = 51) {
                                    > 'Foo!' s;
                                }
            
                                continue;
                            }
            
                            break;
                        }
                    }
                `),
                [
                    'Foo!1',
                    'Foo!11',
                    'Foo!21',
                    'Foo!31',
                    'Foo!41',
                    'Foo!51'
                ]
            );
        });

        it("Output group break", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    Join.concat <- {
                        > 'h';
                        > 'e';
                        > 'l';
                        > 'l';
                        > 'o';

                        break;

                        > ' ';

                        > 'w';
                        > 'o';
                        > 'r';
                        > 'l';
                        > 'd';
                    }
                `),
                'hello'
            );
        });

        it("Repeat and output group break", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    {
                        repeat(0; 10) {
                            > Join.concat <- {
                                > 'h';
                                > 'e';
                                > 'l';
                                > 'l';
                                > 'o';
    
                                > current;
        
                                break;
        
                                > ' ';
        
                                > 'w';
                                > 'o';
                                > 'r';
                                > 'l';
                                > 'd';
                            }
                        }
                    }
                `),
                [
                    'hello0',
                    'hello1',
                    'hello2',
                    'hello3',
                    'hello4',
                    'hello5',
                    'hello6',
                    'hello7',
                    'hello8',
                    'hello9'
                ]
            );
        });
    });
})