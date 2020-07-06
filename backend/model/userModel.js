const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true       
    },
    name : {
        type : String,
        required : true
    },
    photos : Array,
    profileUrl : String,
    dateOfBirth : {
        type : Date,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    setting : {
        showOnly : {
          type : String,
          require : true 
        },
        distance : {
            type : Number,
            default : 40
        },
        pushNotification : {
            type : Boolean,
            default : false
        },
        ageRange : {
           min : {
               type: Number,
               default : 18,
               required: true
           },
           max : {
               type : Number,
               default : 30,
               required : true
           }
        }
       },
       quote : {type : String, default : ''},
       academics : {type : String, default : ''},
       hobbies : Array,
       musics : Array
})

module.exports = mongoose.model('User',userSchema);