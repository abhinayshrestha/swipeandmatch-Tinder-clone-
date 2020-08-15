const User = require('../model/userModel');
const Card = require('../model/cardModel');

exports.getUserInfo = ((req ,res, next) => {
    User.findOne({userId : req.userId})
      .then(userDoc => {
          Card.findOne({ userId : userDoc._id })
              .then(card => {
                    res.status(200).json({
                        userDoc,card
                    })
              })  
      })
      .catch(err => {
          err.statusCode = 500;
          next(err);
      })
})

exports.updateSetting = (req, res, next) => {
    const setting = {
        ageRange : req.body.ageRange,
        distance : req.body.distance,
        pushNotification : false,
        showOnly : req.body.showOnly
    }
    User.findOne({userId : req.userId}).select({ setting : 1 })
    .then( post => {
       if(!post) {
           const error = new Error('Cannot Upadate now');
           error.statusCode = 404;
           throw error;  
       }
       post.setting = setting;
       return post.save(); 
    })
    .then ( post => {
        res.status(200).json({ post })
    })
    .catch( err => {
        err.statusCode = 500;
        next(err);
    })
}

exports.updateProfile = (req, res, next) => {
    User.findOne({ userId : req.userId }).select({ academics : 1, quote : 1,hobbies : 1,musics :1 })
    .then( post => {
        if(!post) {
            const error = new Error('Cannot Upadate now');
            error.statusCode = 404;
            throw error;  
        }
        post.academics = req.body.academics;
        post.quote = req.body.quote;
        post.hobbies = req.body.hobbies;
        post.musics = req.body.musics;
        post.name = req.body.name;
        post.dateOfBirth = new Date(req.body.birthday)
        return post.save();        
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch( err => {
        err.statusCode = 500;
        next(err);
    })
}