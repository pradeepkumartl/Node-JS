const fs = require('fs');
const yargs = require('yargs');

const jsonData = fs.readFileSync("1-json.json");
const jsonStr = jsonData.toString();
const jsonParsed = JSON.parse(jsonStr);
console.log(jsonParsed);

yargs.command({
    command: 'add',
    describe: 'Add details',
    builder: {
        name: {
            describe: 'Name',
            demandOption: true,
            type: 'string'
        },
        age: {
            describe: 'Age',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function(args){
        jsonParsed.name = args.name;
        jsonParsed.age = args.age;
        const dataJSON = JSON.stringify(jsonParsed);
        fs.writeFileSync("1-json.json",dataJSON);
        console.log(dataJSON);
    }
})

yargs.argv;





// const book = {
//     title: 'Pradeep',
//     author: 'kumar'
// }
// const bookJSON =  JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJSON);
// console.log(bookJSON);

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const bookParse = JSON.parse(dataJSON);
// console.log(bookParse.author);