const poonya = require("../../src/poonya");

async function main() {
    const pattern = new poonya.ExecutionPattern({
        path: __dirname + "/sandbox-data/sandbox",
    });

    console.log(await pattern.result().complete(), [{}, {}]);
}

main();