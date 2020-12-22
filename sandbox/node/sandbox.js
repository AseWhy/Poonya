const poonya = require("../../dist/poonya.node.bundle");

const test_pattern = new poonya.ExcecutionPattern('> 1');
//{ path: __dirname + "/sandbox-data/sandbox" }
async function main() {
    test_pattern.on('load', async e => {
        console.log(test_pattern.data.toString())

        console.log(await test_pattern.result().complete());
    })
}

main();