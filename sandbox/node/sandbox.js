const poonya = require("../../src/poonya");

const test_pattern = new poonya.ExecutionPattern({ path: __dirname + "/sandbox-data/sandbox" });

async function main() {
    test_pattern.on('load', async e => {
        console.log(test_pattern.data.toString())

        console.log(await test_pattern.result().complete());
    })
}

main();