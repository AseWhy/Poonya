const { execSync } = require("child_process")
    , { copyFileSync, readdirSync, unlinkSync } = require('fs')
    , { extname, join } = require("path")
    , readline = require("readline");

let question, allow = ["y", "yes", "н", "нуы"];

{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    question = (message) => {
        return new Promise(res => {
            rl.question(message, (responce) => {
                res(responce);
            });
        });
    };
}

async function main(){
    let confirm;

    console.log("running tests");

    console.log(execSync('mocha ./tests').toString('utf-8'));

    try {
        const old_conf = require(__dirname + '/build-data/package.json')
            , new_conf = require(__dirname + '/../package.json');

        if(old_conf.version != new_conf.version) {
            if(!allow.includes((await question('The version has been changed, have you updated the images, and the readme? (Y/N) ')).toLowerCase()))
                process.exit(0);
        }
    } catch (e) {
        console.log('Old or new config file not found, no changes');
    }

    try {
        copyFileSync('package.json', 'build/build-data/package.json');
    } catch (e) {
        console.log('Apparently you deleted the package.json file');
    }

    confirm = await question("Rebuild bundles? (Y/N) ");

    if(allow.includes(confirm.toLowerCase())){
        console.log('Building for node platform commonjs2');
        execSync('webpack --env platform=node');

        console.log('Building for browser minimized platform var');
        execSync('webpack --env platform=browser --env minimize=true --env type=var');

        console.log('Building for browser platform var');
        execSync('webpack --env platform=browser --env minimize=false --env type=var');

        console.log('Building for browser minimized platform system');
        execSync('webpack --env platform=browser --env minimize=true --env type=system');

        console.log('Building for browser platform system');
        execSync('webpack --env platform=browser --env minimize=false --env type=system');

        console.log('Building for browser minimized platform amd');
        execSync('webpack --env platform=browser --env minimize=true --env type=amd');
        
        console.log('Building for browser platform amd');
        execSync('webpack --env platform=browser --env minimize=false --env type=amd');

        console.log('Removing license files...');
        const files = readdirSync('dist');

        for(let i = 0, leng = files.length; i < leng; i++){
            if(!['.js', '.ts'].includes(extname(files[i])))
                unlinkSync(join('dist', files[i]));
        }

        console.log('Formating code...');
        execSync('npx prettier ./dist/poonya.*.bundle.js --write --config prettier.config.json');
    }

    confirm = await question("Commit changes? (Y/N) ");

    if(allow.includes(confirm.toLowerCase())){
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