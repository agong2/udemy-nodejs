console.log('Start app')

const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')
// these are basically third party or Node objects with cool methods like .toString

const notes = require('./notes.js')
// these are your own objects (from your class files) with hopefully cool methods

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}

const bodyOptions = {
  describe: 'Body of note',
  demand: 'true',
  alias: 'b'
}

var textParse = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv
// yargs is a third party and it parses text. this is a yargs object

var argWhat = textParse._[0]
console.log('Enter a command: ')
console.log('Yargs', textParse) // you can see how yargs parses into arrays with this

if (argWhat === 'add') {
  console.log('Adding a note: ')
  var note = notes.addNote(textParse.title, textParse.body)
  if (note) {
    console.log('Note "' + textParse.title + '" added!')
  } else {
    console.log('Note title already exists! ')
  }
} else if (argWhat === 'list') {
  console.log('Listing all notes: ')
  var z = notes.listAll()
  z.forEach((z, index) => console.log(z.title))
} else if (argWhat === 'read') {
  console.log('Reading note: ')
  var y = notes.readNote(textParse.title)
  if (y) { // basically says "if y is returned, then"
    console.log('Title: ' + textParse.title)
    console.log('Body: ' + y.body)
  } else { // if no return is defined, the function doesn't returns undefined -- not a string!
    console.log('"' + textParse.title + '" not found')
  }
} else if (argWhat === 'remove') {
  console.log('Removing note: ')
  var x = notes.removeNote(textParse.title)
  if (x === true) {
    console.log(textParse.title + ' deleted')
  } else {
    console.log(textParse.title + ' not found')
  }
} else {
  console.log('Command not recognized')
}
