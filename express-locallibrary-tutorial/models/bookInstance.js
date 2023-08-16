const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    book:{
        type:Schema.Types.ObjectId,
        ref:"Book", 
        required: true
    },
    imprint:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum:["Available", "Maintenance", "Loaned", "Reserved"],
        default:"Maintenance",
    },
    due_back: {
        type:Date,
        default: Date.now,
    }
});

// creating virtual for bookInstance's url

BookInstanceSchema.virtual('url').get(function(){
    return `/catalog/bookInstance/${this._id}`;
});

const BookInstanceModel = mongoose.model("BookInstace", BookInstanceSchema);

module.exports = BookInstanceModel;