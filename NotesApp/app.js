const notes = require("./notes");
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Body note',
            demandOption: true,
            type:'string'
        }
    },
    handler: function(argv){
        notes.addNotes(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder:{
        title:{
            describe: 'removing a node',
            demandOption: true,
            type:'string'
        }
    },
    handler: function(argv){
        notes.removeNotes(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing a note',
    handler: function(){
        console.log('Listing a new note');
    }
});

yargs.command({
    command: 'read',
    describe: 'read a note',
    handler: function(){
        console.log('Reading a new note');
    }
});

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: ()=>{
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read specific notes',
    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNotes(argv.title)
})

yargs.argv;
// const printNotes = notes();
// console.log(chalk.yellow.bgRed.bold.underline.inverse("Error!"));
