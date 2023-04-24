const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    content: {
        type: String,
        required: true,
        max: 100
    }
}, { timestamps: true });

const postSchema =  new Schema ({
    title: {
        type: String,
        required: true,
        max: 40
    },
    location: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    content: {
        type: String,
        required: true,
        max: 180
    },
    comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);