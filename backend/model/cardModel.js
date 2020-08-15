const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    location : {
        type : {
            type : String,
            default : 'Point'
        },
        coordinates : [Number, Number]
    },
    shown : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
    gender : { type : String },
    liked : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
    matches : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}]
})
cardSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Card',cardSchema);