const poonya = require("../../src/poonya");

async function main() {
    const pattern = await poonya.createPattern(poonya.ExecutionPattern, { path: './sandbox-data/sandbox.po' });

    let stream = pattern.data.result();

    stream.on('data', console.log);
}

main();