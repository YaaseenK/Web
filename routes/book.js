let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our book model
let Book = require('../models/book')

router.get('/' , (req, res, next) =>{
    Book.find((err, BookList)=> {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // console.log(BookList)
            res.render('Book', { title: 'Book List' , bookProperty: BookList});
        }
    });
}); 

module.exports = router;