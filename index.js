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

    // usually set by URL paramaters
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course

    // simple query
    .find({
        author: "Mosh",
        isPublished: true
    })

    // example comparison operator: greater than or equalt 10 / less than or equal to 20
    // .find({ price:  { $gte: 10, $lte: 20 } })

    // example comparison operator: objects containing specific values (in operator)
    // .find({ price: {$in: [10, 15, 20] } })

    // example logic operators: find posts authored by Mosh, or are public
    // .find()
    // .or([ { author: 'Mosh' }, { isPublished: true } ])
    // .and([])

    // regular expression:
    // .find({ author: /pattern/ })

    // regular expression example: starts with Mosh
    // .find({ author: /^Mosh/ })

    // regular expression example: ends with Park-Kennaby (case sensitive)
    // .find({ author: /Park-Kennaby$/ })

    // regular expression example: ends with Park-Kennaby (case insensitive)
    // .find({ author: /Park-Kennaby$/i })

    // regular expression example: contains Mosh
    // .find({ author: /.*Mosh.*/ })

    // using pagination
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize) 

    .sort({ name: 1 }) // means ascending order (-1 = decending)
    .select({ name: 1, tags: 1 }) // only return name and tags properties
    // .count();
    console.log(courses);

};

getCourses();

/**
 * Query and Update Course by ID
 * @param {*} id 
 */
async function queryAndUpdateCourse(id) {

    // approach: query first
    // modify object properties
    // save object
    const course = await Course.findById(id);

    if (!course) return; 
    console.log('test2');

    course.isPublished = true;
    course.author = 'Another Author';

    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });

    const result = await course.save();
    console.log(result);

}

// queryAndUpdateCourse("5d988453960366b7c20c5abb");

/**
 * Update Course without Querying Document First
 * @param {*} id 
 */
async function updateCourse(id) {

    // approach: update first
    // update directly
    // optionally: get the updated document


    // just update a document
    // const result = await Course.update( {_id: id}, {
    //     $set: {
    //         author: 'Joe',
    //         isPublished: false
    //     }
    // } );
    //
    // console.log(result);

    // optionally display the updated document or the document before it was updated
    // const dispayUpdatedDocument = {}; 
    const dispayUpdatedDocument = { new: true }; 

    // update a document and return it
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Sally',
            isPublished: true
        }
    }, dispayUpdatedDocument);

    console.log(course);

}

// updateCourse("5d988453960366b7c20c5abb");