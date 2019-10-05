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

// creating a mongodb model/collection
async function createCourse() {

    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);

};

// createCourse();

// basic mongodb query
async function getCourses() {

    // const courses = await Course.find(); // return all course objects

    const courses = await Course.
    find({
        author: "Mosh",
        isPublished: true
    })
    .limit(10)
    .sort({ name: 1 }) // means ascending order (-1 = decending)
    .select({ name: 1, tags: 1 }); // only return name and tags properties
    console.log(courses);

};

// getCourses();