const poonya = require("../../src/poonya");

async function main() {
    const context = await poonya.createContext({
        hello: 1,
        world: 2
    });

    let out = new poonya.PoonyaOutputStream();

    out.on('data', console.log);

    console.log(await context.eval('> "hello world"', out, console.error));
}

main();