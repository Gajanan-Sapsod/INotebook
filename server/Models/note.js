const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'user'
        
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;

