const fs = require('fs');
const chalk = require('chalk');

getNotes = function(){
    return "Your notes...";
}

addNotes = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(function(note){
        return note.title === title;
    });

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        });
    
        console.log(chalk.bgGreen("Note added"));
        saveNotes(notes);
    } else {
        console.log(chalk.bgRed("duplicate"));
    }
}

removeNotes = function(title){
    const notes = loadNotes();
     
    const keepNotes = notes.filter(function(note){
        if(note.title !== title){
            return note;
        } else {
            return false;
        }
    });

    if(keepNotes.length === notes.length){
        console.log(chalk.bgRed("No notes found"));
    } else {
        console.log(chalk.bgGreen("Note removed"));
    }
    
    saveNotes(keepNotes);
}

saveNotes = function(notes){
    const data = JSON.stringify(notes);
    fs.writeFileSync("notes.json", data);
}

loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync("notes.json");
        const dataString = dataBuffer.toString();
        const parsedData = JSON.parse(dataString);
        return parsedData;
    } catch(e) {
        return [];
    }
}

listNotes = () =>{
    console.log(chalk.bgYellowBright("Your notes"));
    const dataBuffer = loadNotes();
    dataBuffer.forEach((data)=>{console.log(data.title)});
}

readNotes = (title) =>{
    debugger;
    const data = loadNotes();
    const foundNote = data.find((rec)=> rec.title === title );
    if(foundNote){
        console.log(chalk.green.italic(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.bgRed("No note found"));
    }
} 

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
};