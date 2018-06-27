const fs = require('fs')

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('noteappdata.json')
    return JSON.parse(notesString)
    // pulls the JSON notes, converts to JS objects, and stores in array
    // writing to the JSON file will override old notes, so you have to pull em out
  } catch (e) {
    return []
  }
}

var saveNote = (noteList) => {
  fs.writeFileSync('noteappdata.json', JSON.stringify(noteList))
  // this converts JS objects in array to JSON and stores in the .JSON file
}

// // // // // // // // // // // // // // // // // //

var addNote = (title, body) => {
  console.log(title, body)
  var noteList = fetchNotes() // calls the fetchNotes function above
  var note = {
    title,
    body
  // object that stores the arguments
  }

  var duplicateNotes = noteList.filter((note) => note.title === title)
  // filter copies to duplicate array based on parameters (in this case, if note.title = title)

  if (duplicateNotes.length === 0) { // if note.title != title, nothing gets copied over)
    noteList.push(note)
    // this puts the new note object on the array with the old notes
    saveNote(noteList) // calls the saveNotes function above
    return note
  }
}

var listAll = () => {
  return fetchNotes()
}

var readNote = (title) => {
  var noteList = fetchNotes()
  var duplicateNotes = noteList.filter((note) => note.title === title)
  // if note.title = title, it gets copied over
  if (duplicateNotes.length !== 0) {
    return duplicateNotes[0] // returns whatever gets copied over, if anything
  }
}

var removeNote = (title) => {
  var noteList = fetchNotes()
  var duplicateNotes = noteList.filter((note) => note.title !== title)
  // in this case, copies to duplicate array if note.title != title (if note.title = title, it doesn't get copied over)
  saveNote(duplicateNotes)

  return noteList.length !== duplicateNotes.length
}

module.exports = {
  addNote,
  listAll,
  readNote,
  removeNote
}
