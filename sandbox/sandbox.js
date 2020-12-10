const poonya = require("../poonya");

const test_pattern = new poonya.MessagePattern({ path: __dirname + "/sandbox-data/sandbox" });

async function a() {
    const stream = test_pattern.result();

    console.log((await stream.complete()).join(''))
}

a();