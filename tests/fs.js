/* eslint-disable no-undef */
const poonya = require("../src/poonya")
    , assert = require("assert");

describe("poonya-fs-test", () => {
    // 
    // Разница между include и require заключается в том, что include не создает новый контекст
    // просто проводя токенизацию и вставляя токенизированный контент в уже имеющийся контекст.
    // require напротив создает новый контекст из имеющегося(при этом все библиотеки и переменные из
    // родительского контекста будут доступны в дочернем), и выполняет содержимое требуемого файла
    // возвращая как результат выполнения вывод eval этого файла
    // 
    describe("#script-linking-test[eval#0]-base-linking", () => {
        it("base-require-linking", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    require('./src/fs/linking-test-1');
                `), 
                [ 'Hello world!' ]
            );
        });

        it("deep-require-linking", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    require('./src/fs/linking-test-2');
                `), 
                [ ['Hello world!'] ]
            );
        });

        it("base-include-linking", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    include './src/fs/linking-test-3';
                `), 
                'Hello world!'
            );
        });

        it("deep-include-linking", async () => {
            const context = await poonya.createContext();

            assert.deepStrictEqual(
                await context.eval(`
                    include './src/fs/linking-test-4';
                `), 
                'Hello world!'
            );
        });
    })
});