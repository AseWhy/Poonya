const { execSync } = require("child_process")
    , { copyFileSync, renameSync, rmdirSync } = require('fs')
    , readline = require("readline");

let question, allow = ["y", "yes", "н", "нуы"];

{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    question = (message) => {
        return new Promise((res, rej) => {
            rl.question(message, (responce) => {
                res(responce)
            });
        })
    }
}

async function main(){
    console.log("building jsdoc");

    execSync('jsdoc poonya.js');

    rmdirSync('docs', { recursive: true });

    renameSync('out', 'docs');

    try {
        const old_conf = require(__dirname + '/build-data/package.json')
            , new_conf = require(__dirname + '/../package.json');

        if(old_conf.version != new_conf.version) {
            if(!allow.includes((await question('The version has been changed, have you updated the images, and the readme? (Y/N) ')).toLowerCase()))
                process.exit(0);
        }
    } catch (e) {
        console.log('Old or new config file not found, no changes')
    }

    try {
        copyFileSync('package.json', 'build/build-data/package.json');
    } catch (e) {
        console.log('Apparently you deleted the package.json file')
    }

    const commit = await question("Commit changes? (Y/N) ");

    if(allow.includes(commit.toLowerCase())){
        const message = await question('Commit message: ');

        execSync('git add -A --');
        execSync('git commit --quiet -m"' + message + '"');

        const push = await question('Push changes? (Y/N) ');

        if(allow.includes(push.toLowerCase()))
            execSync('git push');

        process.exit(0);
    } else {
        process.exit(0);
    }
}

main();