const { execSync } = require("child_process")
    , readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Commit changes? (Y/N)", (commit) => {
    if(["y", "yes", "н", "нуы"].includes(commit.toLowerCase())) {
        rl.question("Commit message: ", (message) => {
            execSync('git add -A --');
            execSync('git commit --quiet -m"' + message + '"');
            execSync('git push');
        })
    }
});