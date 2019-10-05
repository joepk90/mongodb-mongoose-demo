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

// mongodb query examples
async function getCourses() {

    // example comparison operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // logical operators
    // or
    // and


    // const courses = await Course.find(); // return all course objects

    const courses = await Course

    // simple query
    // .find({
    //     author: "Mosh",
    //     isPublished: true
    // })

    // example comparison operator: greater than or equalt 10 / less than or equal to 20
    // .find({ price:  { $gte: 10, $lte: 20 } })

    // example comparison operator: objects containing specific values (in operator)
    // .find({ price: {$in: [10, 15, 20] } })

    // example logic operators: find posts authored by Mosh, or are public
    // .find()
    // .or([ { author: 'Mosh' }, { isPublished: true } ])
    // .and([])

    .limit(10)
    .sort({ name: 1 }) // means ascending order (-1 = decending)
    .select({ name: 1, tags: 1 }); // only return name and tags properties
    console.log(courses);

};

// getCourses();