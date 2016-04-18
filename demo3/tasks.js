var fs = require("fs");
var path = require("path");
var args = process.argv.splice(2);
var command = args.shift();
var taskdes = args.join(" ");
var file = path.join(process.cwd(), './tasks');
switch (command) {
    case 'list':
        listTask(file);
        break;
    case 'add':
        addTask(file, taskdes);
        break;
    default:
        console.log('Usage:' + process.argv[0] + ' list|add [Task Description]');
}

function loadOrinit(file, cb) {
    fs.exists(file, function(exists) {
        var tasks = [];
        if (exists) {
            fs.readFile(file, 'utf-8', function(err, data) {
                if (err) {
                    throw err;
                }
                var data = data.toString();
                tasks = JSON.parse(data || '[]');
                cb(tasks);
            });
        } else {
            cb([]);
        }
    })
}

function listTask(file) {
    loadOrinit(file, function(tasks) {
        for (var i in tasks) {
            console.log(tasks[i]);
        }
    });
}

function storeTask(file,tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf-8', function(err) {
        if (err) throw err;
        console.log('Saved');
    });
}

function addTask(file, taskdes) {
    loadOrinit(file, function(tasks) {
        tasks.push(taskdes);
        storeTask(file, tasks);
    })
}
