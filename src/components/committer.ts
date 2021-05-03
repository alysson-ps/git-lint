var commit = function(msg){
    const { exec } = require("child_process");
    var commit = 'git commit -m "'+msg+'"';
    exec(commit, (error, stdout, stderr) => {
        console.log(stderr ? 'Commit não realizado.' : 'Commit realizado, realize o push.');
    });
}

exports.commit = commit;