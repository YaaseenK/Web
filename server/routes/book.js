const { Router } = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our book model
let Book = require('../models/book')

//Get Route for the Book-List Page
router.get('/' , (req, res, next) =>{
    Book.find((err, BookList)=> {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // console.log(BookList)
            res.render('book/list', { title: 'Book' , bookProperty: BookList});
        }
    });
}); 

//Get Route for displaying the Add Page // CREATE OPERATION 
router.get('/test' ,( req, res, next) =>{
    res.render('book/test', {title: 'Test'})
});

router.get('/add' , (req, res, next) =>{
    res.render('book/add', {title: 'Add Book'} )
});

//post Route for processing the Add Page // CREATE OPERATION 
router.post('/add' , (req, res, next) => {
    let addedBook = Book({
        "title": req.body.title,
        "description": req.body.description,
        "price": req.body.price,
        "author": req.body.title,
        "genre": req.body.genre
    });
    
    Book.create(addedBook, (err, Book)=> {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list 
            res.redirect('/book-list');
        }
    });
});

//Get Route for displaying the Edit Page // UPDATE OPERATION 
// :id = searching the id as a perimeter 
router.get('/edit/:id' , (req, res, next) => {
    let id = req.params.id; //setting up an id

    Book.findById(id, (err, updateBook)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show edit view
            res.render('book/edit', {title: 'Edit Book', book: updateBook})
        }
    });
});

//post Route for processing the Edit Page // UPDATE OPERATION 
router.post('/edit/:id' , (req, res, next) => {
    let id = req.params.id;

    let editedBook = Book({
        "_id": id,
        "title": req.body.title,
        "description": req.body.description,
        "price": req.body.price,
        "author": req.body.title,
        "genre": req.body.genre
    });

    Book.updateOne({_id: id}, editedBook, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });
});
// Get to preform delete operation // DELETE OPERATION
router.get('/delete/:id' , (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
        
    });
});



module.exports = router;