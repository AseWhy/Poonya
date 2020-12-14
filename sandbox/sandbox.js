const poonya = require("../poonya");

const test_pattern = new poonya.ExcecutionPattern({ path: __dirname + "/sandbox-data/sandbox" });

async function main() {
    console.log(test_pattern.data.toString())

    console.log((await test_pattern.result().complete()))
}

main();