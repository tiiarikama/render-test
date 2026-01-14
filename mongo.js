const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.c3ezwkf.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const notes = [
//   {
//     content: 'HTML is easy',
//     important: true,
//   },
//   {
//     content: 'GET and POST are the most important HTTP methods',
//     important: true,
//   },
//   {
//     content: 'Browser can only execute JavaScript',
//     important: false,
//   },
// ]


// Note.insertMany(notes).then(result => {
//   console.log(`${result.length} notes were saved`)
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })

  mongoose.connection.close()
})