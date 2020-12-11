const poonya = require("../poonya");

const test_pattern = new poonya.MessagePattern({ path: __dirname + "/sandbox-data/sandbox" }, undefined, [ 'default.html' ]);

async function main() {
    console.log((await test_pattern.result().complete()).join(''))
}

main();