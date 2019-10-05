const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then( () => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB', err))

// to connect to mongoDB, make sure mongodb is running on localhost. run:
// mongod
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// takes the singular name
const Course = mongoose.model( 'Course', courseSchema );
const course = new Course({
    name: 'Node.js Course',
    author: 'Mosh',
    tags: ['node, backend'],
    isPublished: true
});