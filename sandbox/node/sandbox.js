const poonya = require("../../src/poonya");

async function main() {
    const expression = await poonya.createPattern(poonya.ExecutionPattern, '> 2 + 2 * 2');
    const pattern = await poonya.createPattern(poonya.ExecutionPattern, { path: './sandbox-data/sandbox.po' });

    let stream = pattern.data.result({pattern: expression.data});

    stream.on('data', console.log);
}

main();