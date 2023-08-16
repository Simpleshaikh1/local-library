const { Date } = require('mongoose');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        maxLength: 100
    },
    last_name: {
        type: String,
        required: true,
        maxLength: 100,
    },
    date_of_birth:{
        type: Date
    },
    date_of_death: {
        type: Date,
    }
});

// creating virtual for author's full name

AuthorSchema.virtual('name').get(function() {
    // to avoid error when an author does not have a family name ,
    // we return an empty string for that case

    let fullName = "";

    if (this.first_name && this.last_name){
        fullName = `${this.last_name}, ${this.first_name}`;
    };

    return fullName;
});

// creating a virtual for author's URL

AuthorSchema.virtual('url').get(function() {
    return `/catalog/author/%{this._id}`;
});

//export model
const AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = AuthorModel;